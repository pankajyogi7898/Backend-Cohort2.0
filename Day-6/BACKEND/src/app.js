// server create krna 
const noteModel = require("./model/note.model")
const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static("./public"))

//post method 

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "notes created successfull"
    })

})

// get method 
app.get("/api/notes", async (req, res) => {

    const note = await noteModel.find()

    res.status(200).json({
        message: "notes fetch successfull",
        note
    })

})

//delete data
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(201).json({
        message: "notes deleted"
    })
})

// update data 
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body

    await noteModel.findByIdAndUpdate(id, {
        title, description
    })

    res.status(201).json({
        message: "notes updated"
    })
})

// //wild card middleware
// app.use('*name', (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "./public/index.html"))
// })

module.exports = app 