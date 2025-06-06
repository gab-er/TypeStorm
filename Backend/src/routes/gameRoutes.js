import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req,res) =>{
    const game = await prisma.game.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(game)
})

router.post('/', async (req, res) =>{
    const {wpm, accuracy, gamemode} = req.body
    const game = await prisma.game.create({
        data: {
            wpm:wpm,
            accuracy:accuracy,
            gamemode: gamemode,
            userId : req.userId

        }
    })
    res.json(game)
})



export default router