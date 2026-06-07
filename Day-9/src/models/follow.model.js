const mongoose = require("mongoose")

//follow schema
const followSchema = new mongoose.Schema({
    follower: {
        type: String,
    },
    followee: {
        type: String,
    }
}, {
    timestamps: true
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

// follow model

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel