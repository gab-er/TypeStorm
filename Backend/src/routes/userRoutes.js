import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs";
import prisma from "../prismaClient.js";
import { error } from "console";

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Get user data
router.get("/", async (req, res) => {
  //Find user from user table
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    //Put relevant user data in data object
    const data = {
      id: user.id,
      username: user.username,
      createdOn: user.createdOn,
    };

    //Return data
    res.status(200).json(data);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    const update = await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        profilePic: result.secure_url,
      },
    });
    unlink(req.file.path, (err) => {
      if (err) throw error;
    });

    if (user.profilePic) {
      try {
        const urlParts = user.profilePic.split("/");
        const publicIdWithExtension = urlParts.slice(-1).join("/");
        const publicId = publicIdWithExtension.split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("error in deleting previous pic");
      }
    }
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

export default router;
