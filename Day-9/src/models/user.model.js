const mongoose = require("mongoose")

//Schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email is already registerd"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profilePic: {
        type: String,
        default: "https://ik.imagekit.io/9qqpodpvh/profile.webp"
    }
})

// Model 
const userModel = mongoose.model("user", userSchema)


module.exports = userModel