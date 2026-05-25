// function

const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("DATABASE CONNECTION SUCCESSFULLY..")
        })
}

module.exports = connectToDB