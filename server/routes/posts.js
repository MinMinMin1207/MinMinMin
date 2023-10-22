import express from "express";
import Post from "../models/Post.js";
import Pet from "../models/Pet.js";

import { MessageResponse, DataResponse, Response, InternalErrorResponse, NotFoundResponse, ErrorResponse, UnAuthorizedResponse } from '../common/reponses.js'

const router = express.Router();

import fileUpload from 'express-fileupload'
import { requireRole } from "../middlewares/auth.js";

router.delete('/:id', requireRole('US'), async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const result = await Pet.destroy({
            where: {
                postId: id,
            }
        });
    
        const del = await Post.destroy({
            where: {
                id: id,
            }
        })
        
        if (result === 0) {
            res.json(NotFoundResponse())
        } else {
            res.json(MessageResponse("Post deleted successfully!"));
        }
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.put('/:id', requireRole("US"), fileUpload(), async (req, res) => {
    const { petName, species, breed, age, petPrice } = req.body;
    console.log(petName, species, breed, age, petPrice);

    const image = req.files.avatar;
    const [fileType, fileExt] = image.mimetype.split("/");

    const savePath = `./public/petImages/${Date.now()}_${userName.replace(
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

        const result = await Pet.update({
            where: {
                petName: petData.petName,
                species: petData.species,
                breed: petData.breed,
                age: petData.age,
                petPrice: petData.petPrice,
                image: image
            }
        });

    if (result[0] === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('Post updated successfully!'))
    }
})

export default router;
