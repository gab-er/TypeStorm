import supertest from "supertest";
import app from "../app.js";
import { PrismaClient } from "@prisma/client";
import { describe, vi, expect, test } from "vitest";
import jwt from "jsonwebtoken";

const request = supertest(app);

vi.mock("@prisma/client");

const prisma = new PrismaClient();

//tests to ensure authmiiddleware behaviour works for game routes
describe("AuthMiddleware test", () => {
  describe("Valid Auth token", () => {
    test("200 status code should be returned and endpoint should be called", async () => {
      prisma.game.findMany.mockResolvedValue("gamedata");
      //stimulate authentication token
      const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/game").set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany
      expect(prisma.game.findMany).toBeCalled;
    });
  });

  describe("Missing Authentication cookie", () => {
    test("Should return 401 and endpoint is not reached", async () => {
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue("gamedata");

      //call route with no cookie
      const res = await request.get("/game");

      //Should return 401
      expect(res.statusCode).toBe(401);

      //Missing token Message should be sent
      expect(res.body.message).toBe("Missing Token");

      //prisma.game.findMany should not be called
      expect(prisma.game.findMany).not.toBeCalled;
    });
  });

  describe("Invalid Authentication token", () => {
    test("Should return 401 and endpoint is not reached", async () => {
      //stimulate games
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue("gamedata");

      //Stimulate invalid token
      const token = "InvalidToken";
      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/game").set("Cookie", cookie);

      //Should return 401
      expect(res.statusCode).toBe(401);

      //Invalid token Message should be sent
      expect(res.body.message).toBe("Invalid Token");

      //prisma.game.findMany should not be called
      expect(prisma.game.findMany).not.toBeCalled;
    });
  });
});

//test for get game route
describe("GET /game", () => {
  describe("without limit specification", () => {
    test("Should return 200 status code and game data of 25 most recent games of user", async () => {
      const userId = 100;
      const games = [
        {
          id: 25,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 1,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue(games);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/game").set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany with userId encoded in token, take 25 most recent games and orderby by descending order of playtime
      expect(prisma.game.findMany).toBeCalledWith({
        where: {
          userId: userId,
        },
        take: 25,
        orderBy: {
          playedOn: "desc",
        },
      });

      //Game should be sent
      expect(res.body).toStrictEqual(games);
    });
  });

  describe("limit specification < 100", () => {
    test("Should return 200 status code and game data of limit most recent games of user", async () => {
      const userId = 100;
      const limit = 50;
      const games = [
        {
          id: limit,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 1,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue(games);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .get(`/game?limit=${limit}`)
        .set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany with userId encoded in token, take 25 most recent games and orderby by descending order of playtime
      expect(prisma.game.findMany).toBeCalledWith({
        where: {
          userId: userId,
        },
        take: limit,
        orderBy: {
          playedOn: "desc",
        },
      });

      //Game should be sent
      expect(res.body).toStrictEqual(games);
    });
  });

  describe("limit specification > 100", () => {
    test("Should return 200 status code and game data of limit most recent games of user", async () => {
      const userId = 100;
      const limit = 200;
      const games = [
        {
          id: 100,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 1,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue(games);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .get(`/game?limit=${limit}`)
        .set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany with userId encoded in token, take 25 most recent games and orderby by descending order of playtime
      expect(prisma.game.findMany).toBeCalledWith({
        where: {
          userId: userId,
        },
        take: 100,
        orderBy: {
          playedOn: "desc",
        },
      });

      //Game should be sent
      expect(res.body).toStrictEqual(games);
    });
  });

  describe("Internal server error", () => {
    test("Should return 500 and no data is to be fetched", async () => {
      const userId = 100;
      const games = [
        {
          id: 25,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 1,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockRejectedValue(
        new Error("Internal server error")
      );

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/game").set("Cookie", cookie);

      //Should return 500
      expect(res.statusCode).toBe(500);

      //prisma.game.findMany should not be called
      expect(prisma.game.findMany).not.toBeCalled;

      //res.body should not have any game data
      expect(res.body).not.toStrictEqual(games);
    });
  });
});

//test get game/length route that returns count of games by user
describe("GET /game/length", () => {
  describe("no server error", () => {
    test("Should return 200 status code and amount of games played by user", async () => {
      const userId = 100;
      const count = 50;
      //stimulate prisma.game.count
      prisma.game.count.mockResolvedValue(count);
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/game/length").set("Cookie", cookie);

      //should return 200 status code
      expect(res.statusCode).toBe(200);

      //should call prisma.game.count with userId
      expect(prisma.game.count).toBeCalledWith({
        where: {
          userId: userId,
        },
      });

      //Should return count of games
      expect(res.body).toBe(count);
    });
  });

  describe("internal server error", () => {
    test("Should return 500 status code and no data is returned", async () => {
      const userId = 100;
      const count = 50;
      //stimulate prisma.game.count
      prisma.game.count.mockRejectedValue(new Error("Internal Server Error"));
      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/game/length").set("Cookie", cookie);

      //should return 200 status code
      expect(res.statusCode).toBe(500);

      //Should return count of games
      expect(res.body).not.toBe(count);
    });
  });
});

//test POST game/next route that returns 50 older games from cursor point
describe("POST /game/next", () => {
  describe("no server error", () => {
    test("return 200 status code and 50 games before cursor", async () => {
      const userId = 100;
      const cursor = 50;
      const games = [
        {
          id: 51,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 100,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue(games);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.post("/game/next").set("Cookie", cookie).send({
        id: cursor,
      });

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany with userId encoded in token, take 50 most recent games before cursor orderby by descending order of playtime
      expect(prisma.game.findMany).toBeCalledWith({
        cursor: {
          id: cursor,
        },
        where: {
          id: { not: cursor },
          userId: userId,
        },
        take: 50,
        orderBy: {
          id: "desc",
        },
      });

      //Game should be sent
      expect(res.body).toStrictEqual(games);
    });
  });

  describe("internal server error", () => {
    test("return 500 status code and no data", async () => {
      const userId = 100;
      const cursor = 51;
      const games = [
        {
          id: 50,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 1,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockRejectedValue(
        new Error("Internal server error")
      );

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.post("/game/next").set("Cookie", cookie).send({
        id: cursor,
      });

      //Should return 200 status code
      expect(res.statusCode).toBe(500);

      //Game should be sent
      expect(res.body).not.toStrictEqual(games);
    });
  });
});

//test POST game/prev route that returns 50 newer games from cursor point
describe("POST /game/prev", () => {
  describe("no server error", () => {
    test("return 200 status code and 50 games before cursor", async () => {
      const userId = 100;
      const cursor = 51;
      const games = [
        {
          id: 50,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 1,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockResolvedValue(games);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.post("/game/prev").set("Cookie", cookie).send({
        id: cursor,
      });

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.game.findMany with userId encoded in token, take 50 games after cursor orderby by descending order of id
      expect(prisma.game.findMany).toBeCalledWith({
        cursor: {
          id: cursor,
        },
        where: {
          id: { not: cursor },
          userId: userId,
        },
        take: 50,
        orderBy: {
          id: "desc",
        },
      });

      //Game should be sent
      expect(res.body).toStrictEqual(games);
    });
  });

  describe("internal server error", () => {
    test("return 500 status code and no data", async () => {
      const userId = 100;
      const cursor = 50;
      const games = [
        {
          id: 51,
          score: 1662,
          wpm: "122",
          accuracy: "0.96",
          errors: 4,
          playedOn: "2025-06-21T12:33:51.567Z",
          gamemode: "STANDARD",
          userId: userId,
        },
        {
          id: 100,
          score: 133,
          wpm: "98",
          accuracy: "0.85",
          errors: 14,
          playedOn: "2025-06-21T12:33:36.131Z",
          gamemode: "TIMED",
          userId: userId,
        },
      ];
      //stimulate prisma.game.findMany
      prisma.game.findMany.mockRejectedValue(
        new Error("Internal server error")
      );

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.post("/game/prev").set("Cookie", cookie).send({
        id: cursor,
      });

      //Should return 200 status code
      expect(res.statusCode).toBe(500);

      //Game should be sent
      expect(res.body).not.toStrictEqual(games);
    });
  });
});

//test POST /game route
describe("POST /game/:gamemode", () => {
  describe("adding standard game", () => {
    test("should return 200 and posted game data", async () => {
      const userId = 100;

      //stimulate game
      const game = {
        id: 1,
        score: 1000,
        wpm: "100",
        accuracy: "0.85",
        errors: 2,
        playedOn: "2025-06-22T07:32:45.211Z()",
        gamemode: "STANDARD",
        userId: userId,
      };
      //stimulate prisma.game.create
      prisma.game.create.mockResolvedValue(game);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/game/STANDARD")
        .set("Cookie", cookie)
        .send({
          score: 1000,
          wpm: 100,
          accuracy: 0.85,
          errors: 2,
        });

      //should return 200 status code
      expect(res.statusCode).toBe(200);

      //should call prsima.game.create with encoded userId , standard gamemode and sent metrics
      expect(prisma.game.create).toBeCalledWith({
        data: {
          wpm: 100,
          accuracy: 0.85,
          errors: 2,
          gamemode: "STANDARD",
          userId: userId,
          score: 1000,
        },
      });

      //Should return game data of new entry
      expect(res.body).toStrictEqual(game);
    });
  });

  describe("adding timed game", () => {
    test("should return 200 and posted game data", async () => {
      const userId = 100;

      //stimulate game
      const game = {
        id: 1,
        score: 1000,
        wpm: "100",
        accuracy: "0.85",
        errors: 2,
        playedOn: "2025-06-22T07:32:45.211Z()",
        gamemode: "TIMED",
        userId: userId,
      };
      //stimulate prisma.game.create
      prisma.game.create.mockResolvedValue(game);

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.post("/game/TIMED").set("Cookie", cookie).send({
        score: 1000,
        wpm: 100,
        accuracy: 0.85,
        errors: 2,
      });

      //should return 200 status code
      expect(res.statusCode).toBe(200);

      //should call prsima.game.create with encoded userId , timed gamemode and sent metrics
      expect(prisma.game.create).toBeCalledWith({
        data: {
          wpm: 100,
          accuracy: 0.85,
          errors: 2,
          gamemode: "TIMED",
          userId: userId,
          score: 1000,
        },
      });

      //Should return game data of new entry
      expect(res.body).toStrictEqual(game);
    });
  });

  describe("internal server error", () => {
    test("should return 500 and no data", async () => {
      const userId = 100;

      //stimulate game
      const game = {
        id: 1,
        score: 1000,
        wpm: "100",
        accuracy: "0.85",
        errors: 2,
        playedOn: "2025-06-22T07:32:45.211Z()",
        gamemode: "STANDARD",
        userId: userId,
      };
      //stimulate prisma.game.create error
      prisma.game.create.mockRejectedValue(new Error("Internal server error"));

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request
        .post("/game/STANDARD")
        .set("Cookie", cookie)
        .send({
          score: 1000,
          wpm: 100,
          accuracy: 0.85,
          errors: 2,
        });

      //should return 500 status code
      expect(res.statusCode).toBe(500);

      //Should not return game data of new entry
      expect(res.body).not.toStrictEqual(game);
    });
  });
});
