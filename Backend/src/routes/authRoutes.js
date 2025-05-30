import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

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
        console.log('Account Successfully Created')
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
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
        res.cookie('jwt', token, {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000,
            partitioned : true 
        })
        res.send({message:`Successfully Authenticated ${username}`})
    } catch(err) {
        console.log(err.message)
        res.sendStatus(503)

    }
})

router.post('/logout', (req,res) =>{
    res.cookie('jwt', '', {maxAge:0})
    res.send({message:"Sucessfully Logged Out"})
})


export default router