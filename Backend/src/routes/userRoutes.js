import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router()

//Get user data
router.get('/', async (req,res) => {

    //Find user from user table
    const user = await prisma.user.findUnique({
        where: {
            id : req.userId
        }
    })

    //Put relevant user data in data object
    const data = {
        id : user.id,
        username: user.username,
        createdOn: user.createdOn
    }

    //Return data
    res.json(data)
})

export default router