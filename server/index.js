const express = require("express")
const dotenv = require('dotenv').config({ path : '.env'})
const cors = require('cors')

const imageRouter = require("./routes/imageRoutes")

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/cloud-pic/images', imageRouter)
app.get('/', (req,res)=>{
    res.json("Welcome to the cloud pic!")
})

app.use('/api/cloud-pic/images', imageRouter)


module.exports = { app };
