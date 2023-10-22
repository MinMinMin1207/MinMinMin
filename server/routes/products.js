import express from "express";
import Product from "../models/Product.js";
import Post from "../models/Post.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

import { requireRole } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
  });
  if (products == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(products));
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const product = await Product.findOne({
    where: {
      id: id,
    },
  });

  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.post("/", requireRole("US"), fileUpload(), async (req, res) => {
  const {
    productName,
    description,
    price,
    size,
    typeOfPet,
    typeOfProduct,
    quantity,
  } = req.body;

  console.log(
    productName,
    description,
    price,
    size,
    typeOfPet,
    typeOfProduct,
    quantity
  );

  const image = req.files.image;
  console.log(image);

  const userId = res.locals.userData.id;

  const [fileType, fileExt] = image.mimetype.split("/");

  const savePath = `./public/productImages/${Date.now()}_${productName.replace(
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
      content: description,
      userId: userId,
    });

    let product = await Product.create({
      productName: productName,
      image: savePath,
      description: description,
      price: price,
      size: size,
      typeOfPet: typeOfPet,
      typeofProduct: typeOfProduct,
      quantity: quantity,
      postId: post.id,
    });

    res.json(
      DataResponse({
        id: product.id,
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
