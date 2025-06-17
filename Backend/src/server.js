///Packages
import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

///Routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import statisticRoutes from './routes/statisticRoutes.js'

///Middleware
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 8000

//CORS settings
app.use(
    cors({
        origin : process.env.FRONTEND_URL,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
        exposedHeaders: ['Set-Cookie'],
        methods: ['GET', 'POST', 'PUT', 'OPTIONS']
    })
)

app.use(cookieParser())

app.use(express.json())

// Website Link
app.get('/', (req,res) => {
    console.log('User Connects to Website')
    res.send('<h1> Placeholder <h1/>')
})

//Routes 
app.use('/auth', authRoutes)

app.use('/user', authMiddleware, userRoutes)

app.use('/game', authMiddleware, gameRoutes)

app.use('/statistic', authMiddleware, statisticRoutes)

app.listen(PORT, console.log("Server is connected"))