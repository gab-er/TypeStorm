import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            id : req.userId
        }
    })
    res.json(user.username)
})

export default router