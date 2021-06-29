require("dotenv").config();


const express = require("express");

const mongoose = require("mongoose");

// Database
const database = require("./database");

// Initialization
const booky = express();

//Configuration
booky.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established!!!!!!!"));



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

booky.get("/author/:name", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (autname) => autname.name === req.params.name
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No book found for the author ${req.params.name}`
    });
  }

  return res.json({ author: getSpecificAuthor });
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

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No book found for the publicationname ${req.params.name}`
    });
  }

  return res.json({ publication: getSpecificPublication });
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

/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/book/add", (req, res) => {
  const { newBook } = req.body;

  database.books.push(newBook);

  return res.json({ books: database.books });
});

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;

  database.author.push(newAuthor);

  return res.json({ authors: database.author });
});

/*
Route           /publication/add
Description     add new pubication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/publication/add", (req, res) => {
  const { newPublication } = req.body;

  database.publication.push(newPublication);

  return res.json({ publication: database.publication });
});

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.newBookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/author/:isbn/:authorID", (req, res) => {
  //update book databse
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorID));
    }
  });
  //update author database
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorID)) {
      return author.books.push(req.params.isbn);
    }
  });
  return res.json({ books: database.books, author: database.author });
});

/*
Route           /publication/update/
Description     Update publication name
Access          PUBLIC
Parameter       name
Methods         PUT
*/

booky.put("/publication/update/:name", (req, res) => {
  database.publication.forEach((publication) => {
    if (publication.name === req.params.name) {
      publication.name = req.body.newPublicationName;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELEte
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  const updateBookDatabase = database.books.filter(
    (book) => book.isbn !== req.params.isbn
  );

  database.books = updateBookDataBase;
  return res.json({ books: database.books });
});

booky.listen(5000, () => console.log("Hey server is running!"));
