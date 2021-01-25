const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    modified: {
        type: Date,
        default: Date.now,
    },
    versions: {
        type: Array,
        default: [],
    },
});

const Note = mongoose.model("NoteData", NoteSchema, "notedatas");
module.exports = Note;