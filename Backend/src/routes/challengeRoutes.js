import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:level", authMiddleware, async (req, res) => {
  try {
    //Extract metrics from current challenge attempt and level from parameter
    const { wpm, accuracy, errors, score } = req.body;
    const { level } = req.params;

    //Ty to find previous challenge attempt
    const oldChallenge = await prisma.challenge.findFirst({
      where: {
        userId: req.userId,
        level: parseInt(level),
      },
    });

    //set oldScore if it exists if not set it to arbituary negative value
    const oldScore = oldChallenge ? oldChallenge.score : -10000;

    //find number of people above user best score
    const count = await prisma.challenge.count({
      where: {
        level: parseInt(level),
        score: { gt: score > oldScore ? score : oldScore },
      },
    });

    //get users ranking by taking count + 1
    const ranking = count + 1;

    //If no attempt found create new entry in challenge table with current attempt
    if (!oldChallenge) {
      const challenge = await prisma.challenge.create({
        data: {
          wpm: wpm,
          accuracy: accuracy,
          errors: errors,
          score: score,
          level: parseInt(level),
          userId: req.userId,
        },
      });

      return res.status(201).json({ data: challenge, ranking: ranking });
    }

    //Update challenge if current attempt score is better
    if (score > oldScore) {
      const challenge = await prisma.challenge.update({
        where: {
          id: oldChallenge.id,
        },
        data: {
          wpm: wpm,
          accuracy: accuracy,
          errors: errors,
          score: score,
          playedOn: new Date(),
        },
      });
      return res.status(201).json({ data: challenge, ranking: ranking });

      //Don't update but send back 200 if old score is better
    } else {
      return res.status(200).json({ data: oldChallenge, ranking: ranking });
    }
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.get("/:level", async (req, res) => {
  try {
    //Extract level from request params
    const { level } = req.params;

    //Find top 50 attempts of level
    const challenge = await prisma.challenge.findMany({
      where: {
        level: parseInt(level),
      },
      take: 50,
      orderBy: {
        score: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
            profilePic: true,
          },
        },
      },
    });
    //Return game data
    res.status(200).json(challenge);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.get("/user/:level", authMiddleware, async (req, res) => {
  try {
    //Extract level from request params
    const { level } = req.params;

    //Find top 50 attempts of level
    const challenge = await prisma.challenge.findFirst({
      where: {
        userId: req.userId,
        level: parseInt(level),
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!challenge) {
      return res.sendStatus(404);
    }

    const count = await prisma.challenge.count({
      where: {
        level: parseInt(level),
        score: { gt: challenge.score },
      },
    });
    const ranking = count + 1;
    //Return attempt data
    res.status(200).json({ data: challenge, ranking: ranking });
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});
export default router;
