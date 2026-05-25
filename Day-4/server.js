// start 
const app = require("./src/app")
const mongoose = require("mongoose")


function connectToDB() {
    mongoose.connect("mongodb://pankajji:6MbfNXoFplqPaPwl@ac-kxf7rwz-shard-00-00.cuc2r6g.mongodb.net:27017,ac-kxf7rwz-shard-00-01.cuc2r6g.mongodb.net:27017,ac-kxf7rwz-shard-00-02.cuc2r6g.mongodb.net:27017/?ssl=true&replicaSet=atlas-10iqfs-shard-0&authSource=admin&appName=Cluster0")
        .then(() => {
            console.log("connection successfully...")
        })
}
connectToDB()

app.listen(3000, () => {
    console.log("server is running port 3000")
})