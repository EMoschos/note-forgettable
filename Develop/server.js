const express = require("express");
const app = express();
const path = require("path");
const PORT =  3000; //Don't for get to add the heroku path "process.env.PORT ||"
const fs = require("fs");
const notesArr = require("./db/db.json")//This needs to go to the db.json file and retrieve data

//url body json parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

//route for index.html file 
app.get("/", (req, res) => {
    console.log("Web app up")
    res.sendFile(path.join(__dirname + "/public/index.html"))
})
//route for when user clicks take note
app.get("/notes", (req, res) => {
    console.log("Notes triggered");
    console.log(notesArr);
     res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// //API route to notes
app.get("/api/notes", (req, res) => res.json(notesArr))

// //Save new note
// app.post("/api/notes", (req, res) => {
// })

// app.delete("/api/notes", (req, res) => {

// })

app.listen(PORT, function () {
    console.log(`the port is listening to ${PORT}`)
})