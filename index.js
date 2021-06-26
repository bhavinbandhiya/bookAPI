const express = require("express");

// Database
const database = require("./database");

// Initialization
const booky = express();

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/

booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /lan
Description     Get specific books based on category
Access          PUBLIC
Parameter       language
Methods         GET
*/

booky.get("/lan/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.language}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});

/*
Route           /a
Description     get all authors
Access          PUBLIC
Parameter       name
Methods         GET
*/

booky.get("/author/:name",(req,res) =>{
  const getSpecificAuthor = database.author.filter(
    (autname) => autname.name === req.params.name
  );

  if(getSpecificAuthor.length === 0){
    return res.json({ 
      error: `No book found for the author ${req.params.name}`
    });
  }

  return res.json({author: getSpecificAuthor});
});

/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publication });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/publications/:name", (req, res) => {
  const getSpecificPublication = database.publication.filter(
    (pubname) => pubname.name === req.params.name
  );

  if(getSpecificPublication.length === 0){
    return res.json({ 
      error: `No book found for the publicationname ${req.params.name}`
    });
  }

  return res.json({publication: getSpecificPublication});
});

/*
Route           /publication/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/publications/book/:isbn", (req, res) => {
  const getSpecificPublication = database.publication.filter((pubbook) =>
    pubbook.books.includes(req.params.isbn)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No Publication found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificPublication });
});


booky.listen(5000, () => console.log("Hey server is running!"));
