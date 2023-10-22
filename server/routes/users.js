import express from "express";
import User from "../models/User.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { decrypt, encrypt } from "../common/crypto.js";
import sendEmail from "../common/sendEmail.js";

import fileUpload from "express-fileupload";
import { requireRole } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(DataResponse(users));
});

router.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const data = {
      email: userData.email,
      password: hashPassword,
      // userName: userData.username,
      // iat: Date.now(),
      // gender: userData.gender,
      // fullName: userData.fullName,
      // phoneNumber: userData.phoneNumber,
    };
    const encrypted = encrypt(data);

    const confirmLink = `${process.env.SERVER_URL}/users/confirm_register?code=${encrypted}`;
    sendEmail(
      data.email,
      "Confirm register account at Paws and Whiskers",
      `
      <p>click this link to register your account at Paws and Whiskers</p><br>
        <a href= "${confirmLink}">${confirmLink}</a>`,
      () => {
        res.json(
          DataResponse("Please check your mail to register your account")
        );
      }
    );

    // User.create(data);
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.get("/confirm_register", async (req, res) => {
  const code = req.query.code;

  try {
    const data = decrypt(code);
    if (Date.now() - data.iat > 5 * 60 * 1000) {
      res.json(UnauthorizedResponse());
      return;
    }

    const user = await User.create({
      email: data.email,
      // username: data.username,
      password: data.password,
    });

    const payload = {
      email: user.email,
      id: user.id,
      // username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });

    res.cookie("token", token);
    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/login", async (req, res) => {
  const userData = req.body;

  const user = await User.findOne({
    where: {
      email: userData.email,
      // userName: userData.userName,
    },
  });

  if (user == null) {
    res.json(NotFoundResponse());
    return;
  }

  const isMatchPassword = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (isMatchPassword) {
    // res.send(MessageResponse('Login successfully!'))
    const payload = {
      email: user.email,
      id: user.id,
      // username: user.username,
      role: user.role,
    };
    console.log(payload);
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });
    res.cookie("token", token);
    res.json(
      DataResponse({
        token: token,
      })
    );
  } else {
    res.json(ErrorResponse(401, "Invalid your username or password!"));
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  res.json(DataResponse(user));
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  res.json(DataResponse(user));
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await User.destroy({
    where: {
      id: id,
    },
  });
  if (result === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("User deleted successfully!"));
  }
});

router.delete("/:username", async (req, res) => {
  const username = req.params.username;

  const result = await User.destroy({
    where: {
      username: username,
    },
  });
  if (result === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("User deleted successfully!"));
  }
});

router.put(
  "/registerinfomation",
  requireRole("US"),
  fileUpload(),
  async function (req, res) {
    const { userName, dob, gender, phoneNumber, address } = req.body;
    console.log(userName, dob, gender, phoneNumber, address);

    const image = req.files.avatar;
    const [fileType, fileExt] = image.mimetype.split("/");

    const savePath = `./public/userImages/${Date.now()}_${userName.replace(
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

    const result = await User.update(
      {
        userName: userName,
        dob: dob,
        gender: gender,
        phoneNumber: phoneNumber,
        address: address,
        avatar: savePath,
      },
      {
        where: { email: res.locals.userData.email },
      }
    );

    if (result[0] === 0) {
      res.json(NotFoundResponse());
    } else {
      res.json(MessageResponse("User updated successfully!"));
    }
  }
);

export default router;
