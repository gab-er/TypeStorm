import supertest from "supertest";
import app from "../app.js";
import { PrismaClient } from "@prisma/client";
import { describe, vi, expect, test } from "vitest";
import jwt from "jsonwebtoken";

const request = supertest(app);

vi.mock("@prisma/client");

const prisma = new PrismaClient();

//testing GET /challenge/:level route
describe("GET /challenge/:level", () => {
  describe("No server error", () => {
    test("200 status code should be returned and top 50 challenge data sorted by score should be returned", async () => {
      const challenge = "leaderboarddata";
      const level = 1;

      //mock prisma call
      prisma.challenge.findMany.mockResolvedValue(challenge);

      const res = await request.get("/challenge/1");

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany
      expect(prisma.challenge.findMany).toBeCalledWith({
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

      expect(res.body).toStrictEqual(challenge);
    });
  });

  describe("Internal Server Error", () => {
    test("Should return 500 no data returned", async () => {
      //mock prisma error
      prisma.challenge.findMany.mockRejectedValue(
        new Error("Internal server error")
      );

      const res = await request.get("/challenge/1");
      //Should return 500
      expect(res.statusCode).toBe(500);

      //prisma.game.findMany should not be called
      expect(prisma.challenge.findMany).not.toBeCalled;
    });
  });
});

//Testing POST /challenge/:level
describe("POST /challenge/:level", () => {
  describe("Valid Auth token, first attempt", () => {
    test("should return 201 and current challenge and ranking", async () => {
      const userId = 100;
      const ranking = 5;
      const game = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
      };
      const challenge = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
        level: 1,
        userId: userId,
      };
      prisma.challenge.findFirst.mockResolvedValue(null);
      prisma.challenge.count.mockResolvedValue(ranking - 1);
      prisma.challenge.create.mockResolvedValue(challenge);
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/challenge/1")
        .set("Cookie", cookie)
        .send(game);

      //Should return 201 status code
      expect(res.statusCode).toBe(201);

      //Should call prisma.challenes.count
      expect(prisma.challenge.count).toBeCalledWith({
        where: {
          level: 1,
          score: { gt: challenge.score },
        },
      });

      //Should call prisma.challenge.create
      expect(prisma.challenge.create).toBeCalledWith({
        data: challenge,
      });

      //Should return ranking in res
      expect(res.body.ranking).toBe(ranking);

      //Should return data in res
      expect(res.body.data).toStrictEqual(challenge);
    });
  });

  describe("Valid Auth token, current attempt is best attempt", () => {
    test("should return 201 and current challenge and ranking", async () => {
      const userId = 100;
      const ranking = 5;
      const game = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
      };
      const oldChallenge = {
        id: 1,
        wpm: 90,
        accuracy: 0.9,
        errors: 5,
        score: 90,
        level: 1,
        userId: userId,
      };
      const update = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
        playedOn: expect.any(Date),
      };
      const challenge = {
        id: 1,
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
        level: 1,
        userId: userId,
      };
      prisma.challenge.findFirst.mockResolvedValue(oldChallenge);
      prisma.challenge.count.mockResolvedValue(ranking - 1);
      prisma.challenge.update.mockResolvedValue(challenge);
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/challenge/1")
        .set("Cookie", cookie)
        .send(game);

      //Should return 201 status code
      expect(res.statusCode).toBe(201);

      expect(prisma.challenge.count).toBeCalledWith({
        where: {
          level: 1,
          score: { gt: challenge.score },
        },
      });

      //Should call prisma.statistic.findMany
      expect(prisma.challenge.update).toBeCalledWith({
        where: { id: oldChallenge.id },
        data: update,
      });

      //Should return ranking in res
      expect(res.body.ranking).toBe(ranking);

      //Should return data in res
      expect(res.body.data).toStrictEqual(challenge);
    });
  });

  describe("Valid Auth token, current attempt is not best attempt", () => {
    test("should return 200 and old challenge and ranking", async () => {
      const userId = 100;
      const ranking = 5;
      const game = {
        wpm: 90,
        accuracy: 0.9,
        errors: 5,
        score: 90,
      };
      const oldChallenge = {
        id: 1,
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
        level: 1,
        userId: userId,
      };

      prisma.challenge.findFirst.mockResolvedValue(oldChallenge);
      prisma.challenge.count.mockResolvedValue(ranking - 1);
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/challenge/1")
        .set("Cookie", cookie)
        .send(game);

      //Should return 201 status code
      expect(res.statusCode).toBe(200);

      expect(prisma.challenge.count).toBeCalledWith({
        where: {
          level: 1,
          score: { gt: oldChallenge.score },
        },
      });

      //Should call prisma.statistic.findMany
      expect(prisma.challenge.update).not.toBeCalled;

      //Should return ranking in res
      expect(res.body.ranking).toBe(ranking);

      //Should return data in res
      expect(res.body.data).toStrictEqual(oldChallenge);
    });
  });

  describe("Missing Auth token", () => {
    test("should return 401 and not reach endpoint", async () => {
      const game = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
      };
      prisma.challenge.findFirst.mockResolvedValue("gamedata");

      const res = await request.post("/challenge/1").send(game);

      //Should return 401 status code
      expect(res.statusCode).toBe(401);

      //Missing token Message should be sent
      expect(res.body.message).toBe("Missing Token");

      //Should not call prisma.statistic.findMany
      expect(prisma.challenge.findFirst).not.toBeCalled;
    });
  });

  describe("Invalid Auth token", () => {
    test("should return 200 and successfully go to endpoint", async () => {
      const game = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
      };
      prisma.challenge.findFirst.mockResolvedValue("gamedata");
      //stimulate authentication token
      const token = "InvalidToken";

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/challenge/1")
        .set("Cookie", cookie)
        .send(game);

      //Should return 401 status code
      expect(res.statusCode).toBe(401);

      //Invalid token Message should be sent
      expect(res.body.message).toBe("Invalid Token");

      //Should not call prisma.statistic.findMany
      expect(prisma.statistic.findMany).not.toBeCalled;
    });
  });
});

//Testing GET /challenge/user/:level
describe("GET /challenge/user/:level", () => {
  describe("Valid Auth token, attempt present", () => {
    test("should return 200, current challenge and ranking", async () => {
      const userId = 100;
      const ranking = 5;
      const challenge = {
        wpm: 100,
        accuracy: 0.9,
        errors: 5,
        score: 100,
        level: 1,
        userId: userId,
      };
      prisma.challenge.findFirst.mockResolvedValue(challenge);
      prisma.challenge.count.mockResolvedValue(ranking - 1);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/challenge/user/1").set("Cookie", cookie);

      //Should return 201 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.challenes.count
      expect(prisma.challenge.findFirst).toBeCalledWith({
        where: {
          userId: userId,
          level: 1,
        },
      });
      expect(prisma.challenge.count).toBeCalledWith({
        where: {
          level: 1,
          score: { gt: challenge.score },
        },
      });
      //Should return ranking in res
      expect(res.body.ranking).toBe(ranking);

      //Should return data in res
      expect(res.body.data).toStrictEqual(challenge);
    });
  });

  describe("Valid Auth token, no attempt present", () => {
    test("should return 404", async () => {
      const userId = 100;
      const ranking = 5;
      prisma.challenge.findFirst.mockResolvedValue(null);
      prisma.challenge.count.mockResolvedValue(ranking - 1);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/challenge/user/1").set("Cookie", cookie);

      //Should return 404 status code
      expect(res.statusCode).toBe(404);

      //Should call prisma.challenes.count
      expect(prisma.challenge.findFirst).toBeCalledWith({
        where: {
          userId: userId,
          level: 1,
        },
      });

      //prisma.challenge.count should ot be called
      expect(prisma.challenge.count).not.toBeCalled;
    });
  });

  describe("Missing Auth token", () => {
    test("should return 401 and not reach endpoint", async () => {
      prisma.challenge.findFirst.mockResolvedValue("gamedata");

      const res = await request.get("/challenge/user/1");

      //Should return 401 status code
      expect(res.statusCode).toBe(401);

      //Missing token Message should be sent
      expect(res.body.message).toBe("Missing Token");

      //Should not call prisma.statistic.findMany
      expect(prisma.challenge.findFirst).not.toBeCalled;
    });
  });

  describe("Invalid Auth token", () => {
    test("should return 200 and successfully go to endpoint", async () => {
      prisma.challenge.findFirst.mockResolvedValue("gamedata");
      //stimulate authentication token
      const token = "InvalidToken";

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/challenge/user/1").set("Cookie", cookie);

      //Should return 401 status code
      expect(res.statusCode).toBe(401);

      //Invalid token Message should be sent
      expect(res.body.message).toBe("Invalid Token");

      //Should not call prisma.statistic.findMany
      expect(prisma.statistic.findMany).not.toBeCalled;
    });
  });
});
