const mongoose = require("mongoose");

const BinSchema = new mongoose.Schema({
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

const Bin = mongoose.model("BinData", BinSchema, "trashdatas");
module.exports = Bin;