import supertest from "supertest";
import app from "../app.js";
import { PrismaClient } from "@prisma/client";
import { describe, vi, expect, test } from "vitest";
import jwt from "jsonwebtoken";

const request = supertest(app);

vi.mock("@prisma/client");

const prisma = new PrismaClient();

describe("AuthMiddleware test", () => {
  describe("Valid Auth token", () => {
    test("should return 200 and successfully go to endpoint", async () => {
      prisma.statistic.findMany.mockResolvedValue("statistics");
      //stimulate authentication token
      const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/statistic").set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.statistic.findMany
      expect(prisma.statistic.findMany).toBeCalled;
    });
  });

  describe("Missing Auth token", () => {
    test("should return 401 and not reach endpoint", async () => {
      prisma.statistic.findMany.mockResolvedValue("statistics");

      const res = await request.get("/statistic");

      //Should return 401 status code
      expect(res.statusCode).toBe(401);

      //Missing token Message should be sent
      expect(res.body.message).toBe("Missing Token");

      //Should not call prisma.statistic.findMany
      expect(prisma.statistic.findMany).not.toBeCalled;
    });
  });

  describe("Invalid Auth token", () => {
    test("should return 200 and successfully go to endpoint", async () => {
      prisma.statistic.findMany.mockResolvedValue("statistics");
      //stimulate authentication token
      const token = "InvalidToken";

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/statistic").set("Cookie", cookie);

      //Should return 401 status code
      expect(res.statusCode).toBe(401);

      //Invalid token Message should be sent
      expect(res.body.message).toBe("Invalid Token");

      //Should not call prisma.statistic.findMany
      expect(prisma.statistic.findMany).not.toBeCalled;
    });
  });
});

describe("GET /statistic", () => {
  describe("No server error", () => {
    test("Should return 200 and user statistics of both gamemodes", async () => {
      const userId = 100;
      const statistics = [
        {
          id: 1,
          gamesPlayed: 10,
          averageScore: 1000,
          bestScore: 2700,
          averageWpm: "100",
          bestWpm: "150",
          averageAccuracy: "0.85",
          bestAccuracy: "1",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 2,
          gamesPlayed: 5,
          averageScore: 1400,
          bestScore: 2610,
          averageWpm: "101",
          bestWpm: "150",
          averageAccuracy: "0.955",
          bestAccuracy: "1",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.statistic.findMany
      prisma.statistic.findMany.mockResolvedValue(statistics);
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/statistic").set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.statistic.findMany with encoded userId
      expect(prisma.statistic.findMany).toBeCalledWith({
        where: {
          userId: userId,
        },
      });

      //Statistics should be sent back
      expect(res.body).toStrictEqual(statistics);
    });
  });

  describe("Internal server error", () => {
    test("Should return 500 and no statistic returned", async () => {
      const userId = 100;
      const statistics = [
        {
          id: 1,
          gamesPlayed: 10,
          averageScore: 1000,
          bestScore: 2700,
          averageWpm: "100",
          bestWpm: "150",
          averageAccuracy: "0.85",
          bestAccuracy: "1",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 2,
          gamesPlayed: 5,
          averageScore: 1400,
          bestScore: 2610,
          averageWpm: "101",
          bestWpm: "150",
          averageAccuracy: "0.955",
          bestAccuracy: "1",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.statistic.findMany
      prisma.statistic.findMany.mockRejectedValue(
        new Error("Internal server error")
      );
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/statistic").set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(500);

      //Statistics should not be sent back
      expect(res.body).not.toStrictEqual(statistics);
    });
  });
});

//Post route to update statistics
describe("POST /statistic/:gamemode", () => {
  describe("Game metrics worse than average and pb", () => {
    test("Should return 200 status code and results with all false", async () => {
      const userId = 100;
      //stimulating game, old and updated statistics
      const game = {
        score: 500,
        wpm: 50,
        accuracy: 0.5,
      };
      const oldStatistic = {
        id: 1,
        gamesPlayed: 1,
        averageScore: 1000,
        bestScore: 1000,
        averageWpm: 100,
        bestWpm: 100,
        averageAccuracy: 1,
        bestAccuracy: 1,
        gamemode: "STANDARD",
        userId: userId,
      };
      const updatedStatistic = {
        gamesPlayed: { increment: 1 },
        averageScore: 750,
        bestScore: 1000,
        averageWpm: 75,
        bestWpm: 100,
        averageAccuracy: 0.75,
        bestAccuracy: 1,
      };

      //Mock prisma methods
      prisma.statistic.findFirst.mockResolvedValue(oldStatistic);
      prisma.statistic.updateMany.mockResolvedValue(updatedStatistic);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/statistic/STANDARD")
        .set("Cookie", cookie)
        .send(game);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.statistic.findfrist with encoded userId and specified gamemode
      expect(prisma.statistic.findFirst).toBeCalledWith({
        where: {
          userId: userId,
          gamemode: "STANDARD",
        },
      });

      //Should be called with newly updated averages and unchanged pbs
      expect(prisma.statistic.updateMany).toBeCalledWith({
        where: { gamemode: "STANDARD", userId: userId },
        data: updatedStatistic,
      });

      //Send back results of if metrics are pbs or above average
      expect(res.body.pbAccuracy).toBe(false);
      expect(res.body.aaAccuracy).toBe(false);
      expect(res.body.pbWpm).toBe(false);
      expect(res.body.aaWpm).toBe(false);
      expect(res.body.pbScore).toBe(false);
      expect(res.body.aaScore).toBe(false);
    });
  });

  describe("Game metrics better than average and pb", () => {
    test("Should return 200 status code and results with all true", async () => {
      const userId = 100;
      //stimulating game, old and updated statistics
      const game = {
        score: 1500,
        wpm: 150,
        accuracy: 1,
      };
      const oldStatistic = {
        id: 1,
        gamesPlayed: 1,
        averageScore: 1000,
        bestScore: 1000,
        averageWpm: 100,
        bestWpm: 100,
        averageAccuracy: 0.5,
        bestAccuracy: 0.5,
        gamemode: "TIMED",
        userId: userId,
      };
      const updatedStatistic = {
        gamesPlayed: { increment: 1 },
        averageScore: 1250,
        bestScore: 1500,
        averageWpm: 125,
        bestWpm: 150,
        averageAccuracy: 0.75,
        bestAccuracy: 1,
      };

      //Mock prisma methods
      prisma.statistic.findFirst.mockResolvedValue(oldStatistic);
      prisma.statistic.updateMany.mockResolvedValue(updatedStatistic);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/statistic/TIMED")
        .set("Cookie", cookie)
        .send(game);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.statistic.findfrist with encoded userId and specified gamemode
      expect(prisma.statistic.findFirst).toBeCalledWith({
        where: {
          userId: userId,
          gamemode: "TIMED",
        },
      });

      //Should be called with newly updated averages and changed pbs
      expect(prisma.statistic.updateMany).toBeCalledWith({
        where: { gamemode: "TIMED", userId: userId },
        data: updatedStatistic,
      });

      //Send back results of if metrics are pbs or above average
      expect(res.body.pbAccuracy).toBe(true);
      expect(res.body.aaAccuracy).toBe(true);
      expect(res.body.pbWpm).toBe(true);
      expect(res.body.aaWpm).toBe(true);
      expect(res.body.pbScore).toBe(true);
      expect(res.body.aaScore).toBe(true);
    });
  });

  describe("Internal Server error", () => {
    test("Should return 500 status code and no results", async () => {
      const userId = 100;
      //stimulating game, old and updated statistics
      const game = {
        score: 500,
        wpm: 50,
        accuracy: 0.5,
      };
      const oldStatistic = {
        id: 1,
        gamesPlayed: 1,
        averageScore: 1000,
        bestScore: 1000,
        averageWpm: 100,
        bestWpm: 100,
        averageAccuracy: 1,
        bestAccuracy: 1,
        gamemode: "STANDARD",
        userId: userId,
      };
      const updatedStatistic = {
        gamesPlayed: { increment: 1 },
        averageScore: 750,
        bestScore: 1000,
        averageWpm: 75,
        bestWpm: 100,
        averageAccuracy: 0.75,
        bestAccuracy: 1,
      };

      //Mock prisma methods
      prisma.statistic.findFirst.mockRejectedValue(
        new Error("Internal server error")
      );
      prisma.statistic.updateMany.mockResolvedValue(updatedStatistic);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/statistic/STANDARD")
        .set("Cookie", cookie)
        .send(game);

      //Should return 200 status code
      expect(res.statusCode).toBe(500);

      //Should not be called
      expect(prisma.statistic.updateMany).not.toBeCalled;

      //No results sent back
      expect(res.body).not.toHaveProperty("pbAccuracy");
      expect(res.body).not.toHaveProperty("aaAccuracy");
      expect(res.body).not.toHaveProperty("pbWpm");
      expect(res.body).not.toHaveProperty("aaWpm");
      expect(res.body).not.toHaveProperty("pbScore");
      expect(res.body).not.toHaveProperty("aaScore");
    });
  });
});
