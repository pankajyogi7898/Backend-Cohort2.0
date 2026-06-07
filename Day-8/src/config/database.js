const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Database connect Sucessfully")
        })
}

module.exports = connectToDB