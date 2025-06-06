import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const statistics = await prisma.statistic.findMany({
        where:{
            userId: req.userId
        }
    })
    res.json(statistics)
})

router.get('/:gamemode', async (req, res) => {
    const {gamemode} = req.params
    const statistic = await prisma.statistic.findFirst({
        where: {
            userId: req.userId,
            gamemode:gamemode
        }
    })
    res.json(statistic)
})



router.post('/:gamemode', async (req, res) => {
   const {averageAccuracy,bestAccuracy ,averageWpm, bestWpm} = req.body 
   const {gamemode} = req.params
   const statistic = await prisma.statistic.updateMany({
    where: {
        userId: req.userId,
        gamemode:gamemode
    },
    data: {
        gamesPlayed: {increment:1},
        averageAccuracy: averageAccuracy,
        bestAccuracy: bestAccuracy,
        averageWpm: averageWpm,
        bestWpm: bestWpm
    },

   })
   res.json(statistic)

   

})

export default router