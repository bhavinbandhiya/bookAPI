const mongoose = require("mongoose");

//Author Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//Authore Modal
const PublicationModal = mongoose.model(PublicationSchema);

module.exports =PublicationModal;