import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router()

router.get('/', async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            id : req.userId
        }
    })
    const data = {
        id : user.id,
        username: user.username,
        createdOn: user.createdOn
    }
    res.json(data)
})

export default router