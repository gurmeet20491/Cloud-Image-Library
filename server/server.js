const { app } = require(".");
const mongoose = require("mongoose")

const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL

if (!MONGO_URL) {
    console.error("MONGO_URL is not defined. Please check your environment variables.");
}

(async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('databse connected!')
    }catch(err){
        console.log(`Error : ${err.message}`)
    }
})()

app.listen(PORT, ()=>
    console.log(`Server is running on port ${PORT}`)
)