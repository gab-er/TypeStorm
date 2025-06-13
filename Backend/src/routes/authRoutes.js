import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

const cookieType = process.env.COOKIE_TYPE || "deploy"

let cookieSettings;

if (cookieType == "dev") {
    const cookieSettings = {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000,
        }
} else {
    const cookieSettings = {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000,
            partitioned : true, 
            secure:true,
            sameSite: 'none'
        }
}

console.log(cookieSettings)

router.post('/register', async (req,res) => {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password,10)
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password : hashedPassword
            }
        })
        const statistics = await prisma.statistic.createMany({
            data: [
                {userId: user.id,gamemode: "STANDARD"},
                {userId: user.id,gamemode: "TIMED30"},
                {userId: user.id,gamemode: "TIMED60"},
                {userId: user.id,gamemode: "TIMED120"}
            ]
        })
        console.log('Account Successfully Created')
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.cookie('jwt', token, cookieSettings)
        res.send({message:`Successfully Authenticated ${username}`})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(501)
    }

})

router.post('/login', async (req, res) => {

    const {username, password} = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (!user) {
            return res.status(404).send({message:`${username} not found`})
        }
        const passwordValid = bcrypt.compareSync(password, user.password)
        if (!passwordValid) {
            return res.status(401).send({message:'Password is incorrect'})
        }
        console.log(`${username} has logged in`)
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.cookie('jwt', token, cookieSettings)
        res.send({message:`Successfully Authenticated ${username}`})
    } catch(err) {
        console.log(err.message)
        res.sendStatus(503)

    }
})

router.post('/logout', (req,res) =>{
    res.cookie('jwt', '', {
            partitioned : true, 
            secure:true,
            maxAge: 0,
            sameSite: 'none'
        })
    res.send({message:"Sucessfully Logged Out"})
})


export default router
