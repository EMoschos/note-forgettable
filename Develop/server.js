const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
// let notes = fs.readFileSync("./db/db.json");//This needs to go to the db.json file and retrieve data
const PORT =  process.env.PORT || 3000; //Don't for get to add the heroku path "process.env.PORT ||"

app.use(express.static(__dirname + '/public'));

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
    // console.log(notes);
     res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// //API route to notes
app.get("/api/notes", (req, res) => {
    res.json(notes)
    console.log(notes)
});

// //Save new note
app.post("/api/notes", (req, res) => {
    let newNote = {
        id: notes.length + 1,
        title: req.body.title,
        text: req.body.text
    };

    let noteList = JSON.parse(fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf-8"));
    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));

    res.json(noteList)
});

app.delete("/api/notes/:id", (req, res) => {
    let delNote = req.params.id
    let noteList = JSON.parse(fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf-8"))
    let rmNote = noteList.filter(noteList => noteList.id != delNote)
    fs.writeFileSync("./db/db.json",JSON.stringify(rmNote))
    res.json(rmNote);
});

app.listen(PORT, function () {
    console.log(`the port is listening to ${PORT}`)
})