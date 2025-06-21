import supertest from 'supertest'
import app from "../app.js";
import { PrismaClient } from '@prisma/client';
import { describe, vi, expect, test } from 'vitest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
 

const request = supertest(app)

vi.mock('@prisma/client')

const prisma = new PrismaClient()

//tests for register endpoint
describe("POST /auth/register", () => {
    //testcase for valid username and password
    describe("Valid username and password", () => {
        
        test("should return 201 status code, create statistic rows, and authentication cookie", async () => {
            //Stimulate not finding user with username
            prisma.user.findUnique.mockResolvedValue(null)
            //Stimulate creating row
            prisma.user.create.mockResolvedValue({id:1,username:"username",password:"hashedpassword", createdOn: new Date()})
            
            const res = await request.post("/auth/register").send({
                username: "username",
                password: "password"
            })
            //Should return 201 status code
            expect(res.statusCode).toBe(201)

            //Should call prisma.user.create with inputed username and hashed password
            expect(prisma.user.create).toBeCalledWith({
                data: {
                    username:"username",
                    password: expect.any(String)
                }
            })

            //Should call prisma.statistic.createMany and create one row for each gamemode with userId 
            expect(prisma.statistic.createMany).toBeCalledWith({
                data: [
                {userId: 1,gamemode: "STANDARD"},
                {userId: 1,gamemode: "TIMED"},
            ]})

            //Extract cookie
            const cookies = res.headers['set-cookie'];
            const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));

            //JWT cookie should be sent
            expect(jwtCookie).toBeDefined();

            //Extract JWT token from cookie
            const token = jwtCookie.slice(jwtCookie.search('=')+1,jwtCookie.search(';'))

            //Token should be valid
            expect(()=>{jwt.verify(token, process.env.JWT_SECRET)}).not.toThrowError
        })
    })

    describe("Existing username", () => {

        test("should return 422 code, not create user or statistic rows and not send cookie", async () => {
            //Stimulate finding another user with username
            prisma.user.findUnique.mockResolvedValue({id:1,username:"existtingusername",password:"hashedpassword"})
            
            const res = await request.post("/auth/register").send({
                username: "username",
                password: "password"
            })
            // Should return 422 status code
            expect(res.statusCode).toBe(422)

            //prisma.user.create should not be called
            expect(prisma.user.create).not.toBeCalled

            //prisma.statistic.createMany should not be called
            expect(prisma.statistic.createMany).not.toBeCalled

            const cookies = res.headers['set-cookie'];
            console.log(cookies)

            //cookie should not be sent
            expect(cookies).not.toBeDefined()
        })
    })

    describe("Internal Server Error", () => {
        test("should return 500 code, not create statistic rows and not send cookie", async () => {
            prisma.user.findUnique.mockResolvedValue(null)
            //Stimulate server error while trying to create data
            prisma.user.create.mockRejectedValue(new Error('Internal Server Error'))

            const res = await request.post("/auth/register").send({
                username: "username",
                password: "password"
            })
            //Should return 500 status code 
            expect(res.statusCode).toBe(500)

            //prisma.statistic.createMany should not be called
            expect(prisma.statistic.createMany).not.toBeCalled

            const cookies = res.headers['set-cookie'];
            console.log(cookies)
            //Cookie should not be sent
            expect(cookies).not.toBeDefined()
        })
    })
})

//Test for login endpoint
describe("POST /auth/register", () => {
    //testcase for valid username and password
    describe("Valid username and password", () => {
        
        test("should return 200 status code, and authentication cookie", async () => {
            //Stimulate finding user 
            const hashedPassword = await bcrypt.hash("password",5)
            prisma.user.findUnique.mockResolvedValue({id:1,username:"username",password:hashedPassword})
            
            
            const res = await request.post("/auth/login").send({
                username: "username",
                password: "password"
            })
            //Should return 200 status code
            expect(res.statusCode).toBe(200)
            
            //Extract cookie
            const cookies = res.headers['set-cookie'];
            const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));

            //JWT cookie should be sent
            expect(jwtCookie).toBeDefined();

            //Extract JWT token from cookie
            const token = jwtCookie.slice(jwtCookie.search('=')+1,jwtCookie.search(';'))

            //Token should be valid
            expect(()=>{jwt.verify(token, process.env.JWT_SECRET)}).not.toThrowError
        })
    })

    //testcase for username that does not exist
    describe("Username not found", () => {

        test("should return 404 code and not send cookie", async () => {
            //Stimulate not finding user
            prisma.user.findUnique.mockResolvedValue(null)
            
            const res = await request.post("/auth/login").send({
                username: "username",
                password: "password"
            })
            // Should return 404 status code
            expect(res.statusCode).toBe(404)

            const cookies = res.headers['set-cookie'];
            console.log(cookies)

            //cookie should not be sent
            expect(cookies).not.toBeDefined()
        })
    })

    //testcase for wrong password
    describe("Valid username and password", () => {
        
        test("should return 401 status code and not send cookie", async () => {
            //Stimulate finding user 
            const hashedPassword = await bcrypt.hash("password",5)
            prisma.user.findUnique.mockResolvedValue({id:1,username:"username",password:hashedPassword})
            
            
            const res = await request.post("/auth/login").send({
                username: "username",
                password: "wrongpassword"
            })
            //Should return 200 status code
            expect(res.statusCode).toBe(401)

            const cookies = res.headers['set-cookie'];
            console.log(cookies)

            //cookie should not be sent
            expect(cookies).not.toBeDefined()
        
        })
    })

    //testcase for internal server error
    describe("Internal Server Error", () => {
        test("should return 500 code and not send cookie", async () => {
            //Stimulate server error while trying to create data
            prisma.user.findUnique.mockRejectedValue(new Error('Internal Server Error'))

            const res = await request.post("/auth/register").send({
                username: "username",
                password: "password"
            })
            //Should return 500 status code 
            expect(res.statusCode).toBe(500)

            const cookies = res.headers['set-cookie'];
            console.log(cookies)
            //Cookie should not be sent
            expect(cookies).not.toBeDefined()
        })
    })
    
})