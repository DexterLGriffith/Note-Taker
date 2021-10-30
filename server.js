const express = require('express');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3001;

//query posts
//serve middleware
//serve static public folder..
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup routes
app.get('/api/notes', (req, res) => {
    const readFile = JSON.parse(fs.readFile('db/db.json',{encoding: 'utf-8'}));
    res.json(readFile);
});
app.post('/api/notes', (req, res) => {
    const readFile = JSON.parse(fs.readFile('db/db.json',{encoding: 'utf-8'}));
    const newNote = {title: req.body.tile,text: req.body.text, id: nanoid()};
    readFile.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(readFile));
});
app.delete('/api/notes/:id', (req, res) => {
    const readFile = JSON.parse(fs.readFile('db/db.json',{encoding: 'utf-8'}));
    const newNote = []; 
    newNote = readFile;
    const getID = req.params.id; 
    newNote = newNote.filter(({ id }) => id !== getID);
    res.JSON(newNote)
    fs.writeFileSync('db/db.json', JSON.stringify(readFile));
})
//htmlgetroutes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//query post end..
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    //lets user know the port its running off of.
});