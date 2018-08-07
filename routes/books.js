const books = require('express').Router()

const { 
    getBooks, 
    getBookById,
    addBook, 
    editBook, 
    deleteBook
} = require('../controllers/books')

books.get('/', getBooks)
books.get('/:id', getBookById)
books.post('/', addBook)
books.put('/:id', editBook )
books.delete('/:id', deleteBook)

module.exports = books