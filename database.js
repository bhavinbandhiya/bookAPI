const books = [
    {
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate: "2021-07-07",
        language: "en",
        numPagr: 250,
        author: [1, 2],
        publication:[1],
        category: ["tech","ptogrammming","education","thriller"]

    }
];

const author = [
    {
        id:1,
        name:"bhavin",
        books:["12345Book"],
    },
    {
        id:2,
        name:"elonmusk",
        books:["12345Book"],
    }
];

const publication = [
    {
        id:1,
        name:"speceX",
        books:["12345Book"],
    }
];

module.exports = {books,author,publication};