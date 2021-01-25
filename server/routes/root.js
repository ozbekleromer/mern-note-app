const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Bin = require("../models/Bin");

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/', async (req, res) => {
    if(req.body.title === "" || req.body.content === "") {
        res.status(422).send("Title or Content cannot be empty string!");
    } 
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
    });

    try {
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    Note.findById(id, async (err, note) => {
        if (!note) {
            res.status(404).send("Note not found! - ID: " + id);
        } else {
            const trash = new Bin({
                _id: note._id,
                title: note.title,
                content: note.content,
                created: note.created,
                modified: note.modified,
                versions: note.versions,
            });
            const savedTrash = await trash.save();
        }
    });

    try {
        const removedNote = await Note.deleteOne({ _id: id });

        res.status(200).json(removedNote);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/specific', (req, res) => {
    res.status(200).send("we are on specific notes!");
});

module.exports = router;