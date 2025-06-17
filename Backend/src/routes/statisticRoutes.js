import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// Get user statistics
router.get('/', async (req, res) => {

    //Find user statistic from user table 
    const statistics = await prisma.statistic.findMany({
        where:{
            userId: req.userId
        }
    })

    //return statistics
    res.json(statistics)
})

// Get user statistic for specific gamemode 
router.get('/:gamemode', async (req, res) => {
    //Extract gamemode from request params
    const {gamemode} = req.params

    //Find user statistics for gamemode from user table
    const statistic = await prisma.statistic.findFirst({
        where: {
            userId: req.userId,
            gamemode:gamemode
        }
    })

    //Return statistic
    res.json(statistic)
})

//Update user statistics after game played
router.post('/:gamemode', async (req, res) => {
   //Extract metrics of game played from request body
   const {wpm,accuracy} = req.body

   //Extract gamemode from request params
   const {gamemode} = req.params

   //Find original user statistics
   const oldStatistic = await prisma.statistic.findFirst({
        where: {
            userId: req.userId,
            gamemode:gamemode
        }
    })
   
   //Extract metrics of original user statistics
   const {averageAccuracy,bestAccuracy ,averageWpm, bestWpm, gamesPlayed} = oldStatistic

   //Check if the metrics are above average and personal bests
   const pbAccuracy = accuracy >= bestAccuracy
   const aaAccuracy = accuracy >= averageAccuracy
   const pbWpm = wpm >= bestWpm
   const aaWpm = wpm >= averageWpm

   //Put the results in a object to send back
   const result = {
    pbAccuracy:pbAccuracy,
    aaAccuracy:aaAccuracy,
    pbWpm:pbWpm, 
    aaWpm:aaWpm
   }

   //Update statistics with stats of new gamemode
   const statistic = await prisma.statistic.updateMany({
    where: {
        userId: req.userId,
        gamemode:gamemode
    },
    data: {
        //Increase games played by one
        gamesPlayed: {increment:1},

        //Update average metrics
        averageAccuracy: (averageAccuracy*gamesPlayed + accuracy)/(gamesPlayed+1),
        bestAccuracy: accuracy > bestAccuracy? accuracy:bestAccuracy,

        //Replace personal best with new metrics if they are better
        averageWpm: (averageWpm*gamesPlayed + wpm)/(gamesPlayed+1),
        bestWpm: wpm > bestWpm? wpm:bestWpm
    },

   })

   //Return results
   res.json(result)

   

})

//Reset user statistics for specific gamemode
router.put('/:gamemode', async (req,res) =>{
    //Extract gamemode for request params
    const {gamemode} = req.params

    //Reset user statistic for specific gamemode
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