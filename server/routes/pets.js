import express from "express";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

import Pet from "../models/Pet.js";
import Post from "../models/Post.js";

import { requireRole } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.findAll({
    include: {
      model: Post,
      attributes: ["content, userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
  });
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.post("/", requireRole("US"), fileUpload(), async (req, res) => {
  const { petName, species, breed, age, petPrice, content } = req.body;
  console.log(petName, species, breed, age, petPrice, content);

  const image = req.files.image;
  console.log(image);

  const userId = res.locals.userData.id;

  const [fileType, fileExt] = image.mimetype.split("/");

  const savePath = `./public/petImages/${Date.now()}_${petName.replace(
    " ",
    "-"
  )}.${fileExt}`;

  const allowExtensions = ["png", "jpg", "jpeg"];
  if (fileType !== "image" || !allowExtensions.includes(fileExt)) {
    res.json(InvalidTypeResponse());
    return;
  }
  console.log(savePath);
  image.mv(savePath);

  try {
    let post = await Post.create({
      content: content,
      userId: userId,
    });

    let pet = await Pet.create({
      petName,
      species,
      breed,
      age,
      petPrice,
      postId: post.id,
      image: savePath,
      creatorId: userId,
    });

    res.json(
      DataResponse({
        id: pet.id,
        image: savePath,
        content: post.content,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

export default router;
