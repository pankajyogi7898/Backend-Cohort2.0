const mongoose = require("mongoose")

//schema create  - kaise type se format rhega iska aur properties aur values kya kya rhenge
const noteSchema = new mongoose.Schema({
    description: String,
    title: String
})


//model create - crud operation perform ke liye
const noteModel = mongoose.model("notes", noteSchema)


// export model
module.exports = noteModel