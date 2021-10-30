const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

//serve middleware
//serve static public folder..
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//setup routes
app.get('/api/notes', (req, res) => {
    const readFile = JSON.parse(fs.readFile('db/db.jsona',{encoding: 'utf-8'}));
    res.json(readFile);
});
