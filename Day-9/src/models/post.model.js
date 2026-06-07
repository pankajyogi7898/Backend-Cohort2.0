const mongoose = require("mongoose")

// post schema

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image is required for a post"]
    },
    userId: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "post must be associated with a user"]
    }
})

// post model

const postModel = mongoose.model("post", postSchema)

module.exports = postModel