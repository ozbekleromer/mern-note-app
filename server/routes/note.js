const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const note = await Note.findById(id);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    Note.findById(id, (err, note) => {
        if(!note) {
            res.status(404).send("Note not found! - ID: " + id);
        } else if(req.body.title === "" || req.body.content === "") {
            res.status(422).send("Title or Content cannot be empty string!");
        } else {
            note.versions.push({
                title: note.title,
                content: note.content,
                modified: note.modified,
            });
            note.title = req.body.title;
            note.content = req.body.content;
            note.modified = Date.now();

            note
                .save()
                .then(note => {
                    res.status(200).json(note);
                })
                .catch(err => res.status(500).send(err.message));
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body)
});

module.exports = router;