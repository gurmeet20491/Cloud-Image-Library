const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    title : String,
    description : String,
    public_id : String,
    imageUrl : String,
    imageName : String,
    upload_on: {
        type :Date,
        default : Date.now
    }
})

const Image = mongoose.model('images', imageSchema)

module.exports = Image;