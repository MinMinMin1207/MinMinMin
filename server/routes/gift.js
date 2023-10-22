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

import { requireRole } from "../middlewares/auth.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Post from "../models/Post.js";
import Pet from "../models/Pet.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.findAll({
    where: {
      price: 0,
    },
    include: {
      model: Post,
      attributes: ["content", "userId"],
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

export default router;
