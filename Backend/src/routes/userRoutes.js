import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

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

export default router;
