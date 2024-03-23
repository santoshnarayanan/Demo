// * Create a server for Book Service
require("dotenv").config();
const express = require("express");

//Connect
require('../db/db');
const Book = require("./Book");

const app = express();
const port = 3000;
app.use(express.json());

/**
 * Get all books from database
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 */
app.post("/book", (req, res) => {
    Book.find().then((books) => {
        if(books.length !== 0){
            res.json(books)
        }else{
            res.status(404).json({message: "No books found"})
        }
    }).catch((error) => {
        res.status(500).send(error)
    })
})

/**
 * Get all books from database
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 */
app.get("/books", (req, res) => {
    Book.find().then((books) => {
        if(books.length!==0){
            res.json(books)
        }else{
            res.status(404).json({message: "No books found"})
        }
    });
})

/**
 * Get a book by its ID
 * @param {string} req.params.id - The ID of the book to retrieve
 * @param {function} res.json - A JSON response with the book data
 * @param {function} res.status - Sets the HTTP status code of the response
 * @param {object} res.status.404 - A JSON response with an error message indicating that the book was not found
 * @param {object} res.status.500 - A JSON response with an error message indicating that there was an internal server error
 */
app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        }else{
            res.status(404).json({message: "Book not found"})
        }
    }).catch((error) => {
        res.status(500).json({message: error})
    })
})

/**
 * Delete a book by its ID
 * @param {string} req.params.id - The ID of the book to delete
 * @param {function} res.json - A JSON response with a message indicating that the book was deleted successfully
 * @param {function} res.status - Sets the HTTP status code of the response
 * @param {object} res.status.404 - A JSON response with an error message indicating that the book was not found
 * @param {object} res.status.500 - A JSON response with an error message indicating that there was an internal server error
 */
app.delete("/book/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id).then((book) => {
        if(book){
            res.json('Book deleted successfully')
        }else{
            res.status(404).json({message: "Book not found"})
        }
    }).catch((error) => {
        res.status(500).json({message: error})
    })
});