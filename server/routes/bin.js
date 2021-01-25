const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Bin = require("../models/Bin");

router.get('/', async (req, res) => {
    try {
        const trashes = await Bin.find();
        res.status(200).json(trashes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const trash = await Bin.findById(id);
        res.status(200).json(trash);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    Bin.findById(id, async (err, trash) => {
        if (!trash) {
            res.status(404).send("Note not found! - ID: " + id);
        } else {
            const note = new Note({
                _id: trash._id,
                title: trash.title,
                content: trash.content,
                created: trash.created,
                modified: trash.modified,
                versions: trash.versions,
            });
            const restoredNote = await note.save();
        }
    });

    try {
        const removedTrash = await Bin.deleteOne({ _id: id });

        res.status(200).json(removedTrash);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


module.exports = router;