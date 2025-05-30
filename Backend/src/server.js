import express from 'express'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()
const PORT = process.env.PORT || 8000

app.use(
    cors({
        origin : process.env.FRONTEND_URL,
        credentials: true
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

app.listen(PORT, console.log("Server is connected"))