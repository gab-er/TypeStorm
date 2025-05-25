import express from 'express'
import authRoutes from './routes/authRoutes.js'
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// Website Link
app.get('/', (req,res) => {
    console.log('User Connects to Website')
    res.send('<h1> Placeholder <h1/>')
})

//Routes
app.use('/auth', authRoutes)

app.listen(PORT, console.log("Server is connected"))