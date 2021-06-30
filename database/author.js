const mongoose = require("mongoose");

//Author Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//Authore Modal
const AuthorModal = mongoose.model("author",AuthorSchema);

module.exports = AuthorModal;