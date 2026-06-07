const mongoose = require('mongoose');

//schema create
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
})

// create model 
const userModel = mongoose.model("register", userSchema)

module.exports = userModel

