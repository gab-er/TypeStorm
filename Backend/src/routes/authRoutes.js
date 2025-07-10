import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

// Change cookie settings based on environmental variable for development or deployment purposes
const cookieType = process.env.COOKIE_TYPE || "deploy";

const cookieSettings =
  cookieType == "dev"
    ? {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }
    : {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        partitioned: true,
        secure: true,
        sameSite: "none",
      };

console.log(cookieSettings);

// Register new account
router.post("/register", async (req, res) => {
  // Extract username and password from body of request
  const { username, password } = req.body;

  // Hash password for storage
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    //check if username is taken
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    //return 422 if username is taken
    if (existingUser) {
      console.log(`${username} already taken`);
      return res.status(422).send({ message: `${username} already taken` });
    }
    //Create row in user table
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    //Create rows in statistics table for each gamemode for user
    const statistics = await prisma.statistic.createMany({
      data: [
        { userId: user.id, gamemode: "STANDARD" },
        { userId: user.id, gamemode: "TIMED" },
        { userId: user.id, gamemode: "CHALLENGE" },
      ],
    });
    console.log("Account Successfully Created");

    //Send authentication token to user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("jwt", token, cookieSettings);
    res.status(201).send({ message: `Successfully Authenticated ${username}` });
  } catch (err) {
    //Catch and log any error
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Login to account
router.post("/login", async (req, res) => {
  // Extract username and password from body of request
  const { username, password } = req.body;

  try {
    // Find account with same username
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    // Return 404 if username not in user table
    if (!user) {
      console.log(`${username} not found`);
      return res.status(404).send({ message: `${username} not found` });
    }

    // Check if password is correct
    const passwordValid = bcrypt.compareSync(password, user.password);

    //Return 401  if password is incorrect
    if (!passwordValid) {
      console.log("Password is incorrect");
      return res.status(401).send({ message: "Password is incorrect" });
    }
    console.log(`${username} has logged in`);

    //Send authentication token to user if no errors
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("jwt", token, cookieSettings);
    res.status(200).send({ message: `Successfully Authenticated ${username}` });
  } catch (err) {
    //Catch and log any erros
    console.log(err.message);
    res.sendStatus(500);
  }
});

//Logout
router.post("/logout", (req, res) => {
  // Set authentication cookie to expire
  res.cookie("jwt", "", {
    partitioned: true,
    secure: true,
    maxAge: 0,
    sameSite: "none",
  });
  res.send({ message: "Sucessfully Logged Out" });
});

export default router;
