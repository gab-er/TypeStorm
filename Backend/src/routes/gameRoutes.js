import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// Get data on n recent games, where n is the limit
router.get("/", async (req, res) => {
  try {
    //Extract limit from query, defaulting to 25 if no limit is defined and maxing out at 100
    const limit = Math.min(Number(req.query.limit) || 25, 100);

    //Find recent games from game table by user
    const game = await prisma.game.findMany({
      where: {
        userId: req.userId,
      },
      take: parseInt(limit) || 25,
      orderBy: {
        playedOn: "desc",
      },
    });

    //Return game data
    res.status(200).json(game);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

// Get the total amount of games played by user
router.get("/length", async (req, res) => {
  try {
    const length = await prisma.game.count({
      where: {
        userId: req.userId,
      },
    });
    res.json(length);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

// Get next 50 games from cursor point
router.post("/next", async (req, res) => {
  //Extract cursor from request body
  try {
    const { id } = req.body;

    //Find next 50 games from cursor point in game table by user
    const game = await prisma.game.findMany({
      cursor: {
        id: id,
      },
      where: {
        id: { not: id },
        userId: req.userId,
      },
      take: 50,
      orderBy: {
        id: "desc",
      },
    });

    //Return game data
    res.status(200).json(game);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

// Get previous 50 games from cursor point
router.post("/prev", async (req, res) => {
  //Extract cursor from request body
  try {
    const { id } = req.body;

    //Find previous 50 games from cursor point in game table by user
    const game = await prisma.game.findMany({
      cursor: {
        id: id,
      },
      where: {
        id: { not: id },
        userId: req.userId,
      },

      orderBy: {
        id: "desc",
      },
      take: -50,
    });

    //Return game data
    res.status(200).json(game);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

// Add games to game table
router.post("/:gamemode", async (req, res) => {
  //Extract game stats from request body
  try {
    const { wpm, accuracy, errors, score } = req.body;

    //Extract gamemode of game from request params
    const { gamemode } = req.params;

    //Add new row to game table
    const game = await prisma.game.create({
      data: {
        wpm: wpm,
        accuracy: accuracy,
        errors: errors,
        gamemode: gamemode,
        userId: req.userId,
        score: score,
      },
    });
    res.status(200).json(game);
  } catch (err) {
    //log and catch any error
    console.log(err.message);
    res.sendStatus(500);
  }
});

export default router;
