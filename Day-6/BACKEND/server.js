// server start 
require("dotenv").config()
const app = require("./src/app")

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
// database create krna 

const connectToDB = require("./src/config/database")

connectToDB()