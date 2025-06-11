import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req,res) =>{
    const game = await prisma.game.findMany({
        where: {
            userId: req.userId
        },
        take: 25,
        orderBy: {
            playedOn: 'desc'
        }
    })
    res.json(game)
})

router.get('/all', async (req,res) =>{
    const game = await prisma.game.findMany({
        where: {
            userId: req.userId
        },
        orderBy: {
            playedOn: 'desc'
        }
    })
    res.json(game)
})

router.post('/:gamemode', async (req, res) =>{
    const {wpm, accuracy, errors} = req.body
    const {gamemode} = req.params
    const game = await prisma.game.create({
        data: {
            wpm:wpm,
            accuracy:accuracy,
            errors: errors,
            gamemode:gamemode,
            userId : req.userId

        }
    })
    res.json(game)
})



export default router