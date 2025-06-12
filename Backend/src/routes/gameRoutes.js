import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req,res) =>{
    const limit = Math.min(Number(req.query.limit) || 25, 100)
    const game = await prisma.game.findMany({
        where: {
            userId: req.userId
        },
        take: parseInt(limit) || 25,
        orderBy: {
            playedOn: 'desc'
        }
    })
    res.json(game)
})

router.post('/next', async (req,res) => {
    const {id} = req.body
    const game = await prisma.game.findMany({
        cursor:{
            id:id
        },
        where: {
            id: {not:id},
            userId:req.userId
        },
        take: 50,
        orderBy: {
            id: 'desc'
        }
    })
    res.json(game)
})

router.post('/prev', async (req,res) => {
    const {id} = req.body
    const game = await prisma.game.findMany({
        cursor:{
            id:id
        },
        where:{
            id:{not:id},
            userId:req.userId
        },

        orderBy: {
            id: 'desc'
        },
        take:-50
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