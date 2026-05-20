// server create 

const express = require("express")

const app = express()
app.use(express.json())

const notes = []

// POST METHOD
app.post("/notes", (req, res) => {
    notes.push(req.body)
    console.log(req.body)
    res.status(201).json({
        "message": "notes sucessfull request"
    })
})

// GET METHOD 
app.get("/notes", (req, res) => {
    res.status(200).json({
        notes: notes
    })
})

// DELETE METHOD
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index]

    res.status(201).json({
        "message": "notes deleted successfully"
    })
})


// UPDATE METHOD (PATCH)
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description

    res.status(201).json({
        "message": "notes updated successfully"
    })
})



module.exports = app