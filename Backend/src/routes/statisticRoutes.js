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
   const {wpm,accuracy} = req.body
   const {gamemode} = req.params
   const oldStatistic = await prisma.statistic.findFirst({
        where: {
            userId: req.userId,
            gamemode:gamemode
        }
    })
   const {averageAccuracy,bestAccuracy ,averageWpm, bestWpm, gamesPlayed} = oldStatistic
   const pbAccuracy = accuracy >= bestAccuracy
   const aaAccuracy = accuracy >= averageAccuracy
   const pbWpm = wpm >= bestWpm
   const aaWpm = wpm >= averageWpm
   const result = {
    pbAccuracy:pbAccuracy,
    aaAccuracy:aaAccuracy,
    pbWpm:pbWpm, 
    aaWpm:aaWpm
   }
   const statistic = await prisma.statistic.updateMany({
    where: {
        userId: req.userId,
        gamemode:gamemode
    },
    data: {
        gamesPlayed: {increment:1},
        averageAccuracy: (averageAccuracy*gamesPlayed + accuracy)/(gamesPlayed+1),
        bestAccuracy: accuracy > bestAccuracy? accuracy:bestAccuracy,
        averageWpm: (averageWpm*gamesPlayed + wpm)/(gamesPlayed+1),
        bestWpm: wpm > bestWpm? wpm:bestWpm
    },

   })
   res.json(result)

   

})

router.put('/:gamemode', async (req,res) =>{
    const {gamemode} = req.params
    const statistic = await prisma.statistic.updateMany({
    where: {
        userId: req.userId,
        gamemode:gamemode
    },
    data: {
        gamesPlayed: 0,
        averageAccuracy: null,
        bestAccuracy: null,
        averageWpm: null,
        bestWpm: null
    },

   })
   console.log("statistics reset")
   res.json(statistic)
})

export default router