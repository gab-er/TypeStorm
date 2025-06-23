import supertest from "supertest";
import app from "../app.js";
import { PrismaClient } from "@prisma/client";
import { describe, vi, expect, test } from "vitest";
import jwt from "jsonwebtoken";

const request = supertest(app);

vi.mock("@prisma/client");

const prisma = new PrismaClient();

describe("GET /user", () => {
  //Testcase for valid authentication cookie
  describe("Valid authentication cookie", () => {
    test("should recieve 200 status code and userId, username and createdOn of user", async () => {
      const userId = 100;
      //stimulate prisma.user.findUnique
      prisma.user.findUnique.mockResolvedValue({
        id: userId,
        username: "username",
        password: "hashedpassword",
        createdOn: new Date(),
      });

      //stimulate authentication token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;

      const res = await request.get("/user").set("Cookie", cookie);

      //Should return 200 status code
      expect(res.statusCode).toBe(200);

      //Should call prisma.user.findunique with encoded id in token
      expect(prisma.user.findUnique).toBeCalledWith({
        where: {
          id: userId,
        },
      });

      //Res.body should have id,username and createdOn but not have password
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("username");
      expect(res.body).toHaveProperty("createdOn");
      expect(res.body).not.toHaveProperty("password");
    });
  });
  //test case for missing authentication cookie
  describe("Missing Authentication cookie", () => {
    test("Should return 401 and no data is to be fetched", async () => {
      //stimulate prisma.user.findUnique
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        username: "username",
        password: "hashedpassword",
        createdOn: new Date(),
      });

      const res = await request.get("/user");

      //Should return 401
      expect(res.statusCode).toBe(401);

      //Missing token Message should be sent
      expect(res.body.message).toBe("Missing Token");

      //prisma.user.findUnique should not be called
      expect(prisma.user.findUnique).not.toBeCalled;

      //res.body should not have any user data
      expect(res.body).not.toHaveProperty("id");
      expect(res.body).not.toHaveProperty("username");
      expect(res.body).not.toHaveProperty("createdOn");
    });
  });

  //test case for invalid authentication cookie
  describe("Invalid Token", () => {
    test("Should return 401 and no data is to be fetched", async () => {
      //stimulate prisma.user.findUnique
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        username: "username",
        password: "hashedpassword",
        createdOn: new Date(),
      });
      //Stimulate invalid token
      const token = "InvalidToken";
      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;
      const res = await request.get("/user").set("Cookie", cookie);

      //Should return 401
      expect(res.statusCode).toBe(401);

      //Invalid token Message should be sent
      expect(res.body.message).toBe("Invalid Token");

      //prisma.user.findUnique should not be called
      expect(prisma.user.findUnique).not.toBeCalled;

      //res.body should not have any user data
      expect(res.body).not.toHaveProperty("id");
      expect(res.body).not.toHaveProperty("username");
      expect(res.body).not.toHaveProperty("createdOn");
    });
  });

  //test case for internal server error
  describe("Internal server error", () => {
    test("Should return 500 and no data is to be returned", async () => {
      //stimulate prisma.user.findUnique
      prisma.user.findUnique.mockRejectedValue(
        new Error("Internal Server Error")
      );
      //Stimulate token
      const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      //put token in cookie
      const cookie = `jwt=${token}; Max-Age=86400; Path=/; HttpOnly`;
      const res = await request.get("/user").set("Cookie", cookie);

      //Should return 500
      expect(res.statusCode).toBe(500);

      //res.body should not have any user data
      expect(res.body).not.toHaveProperty("id");
      expect(res.body).not.toHaveProperty("username");
      expect(res.body).not.toHaveProperty("createdOn");
    });
  });
});
