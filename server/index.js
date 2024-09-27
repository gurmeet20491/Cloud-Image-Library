const express = require("express")
const dotenv = require('dotenv').config({ path : '.env'})
const cors = require('cors')

const imageRouter = require("./routes/imageRoutes")

const app = express()

app.use(express.json())
app.use(cors({
    origin : 'https://cloud-pic-app.vercel.app',
    methods : "GET,POST,DELETE,PUT,PATCH",
    credentials : true
}))

app.use('/api/cloud-pic/images', imageRouter)
app.get('/', (req,res)=>{
    res.json("Welcome to the cloud pic!")
})
app.get('/env', (req,res)=>{
    res.json(process.env.CLOUDINARY_CLOUD_NAME)
})

app.use('/api/cloud-pic/images', imageRouter)


module.exports = { app };
