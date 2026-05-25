const mongoose = require("mongoose")
function connectToDB() {
    mongoose.connect("mongodb://pankajji:GwaJ6XdE0Cg1qeDB@ac-kxf7rwz-shard-00-00.cuc2r6g.mongodb.net:27017,ac-kxf7rwz-shard-00-01.cuc2r6g.mongodb.net:27017,ac-kxf7rwz-shard-00-02.cuc2r6g.mongodb.net:27017/?ssl=true&replicaSet=atlas-10iqfs-shard-0&authSource=admin&appName=Cluster0/day-5")
        .then(() => {
            console.log("database connection successfully...")
        })
}

module.exports = connectToDB