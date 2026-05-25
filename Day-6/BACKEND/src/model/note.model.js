const mongoose = require("mongoose")
// create schema 
const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

//create a model 
const noteModel = mongoose.model("notes", noteSchema)

//  export method
module.exports = noteModel