const Book = require('../models/book')
const errorHelper = require('../helpers/errorHelper')


const findBookPromise = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Book.findById(req.params.id)
            .then(book => {
                if (book) {
                    resolve(book)
                } else {
                    res.status(204).json({
                        message: `no books found`,
                        data: book
                    })
                }
            })
            .catch(err => errorHelper(err, res))
    })
}

const getBooks = (req, res, next) => {
    Book.find()
        .then(books => {
            if (books.length > 0) {
                res.status(200).json({
                    message: `success get all books`,
                    data: books
                })
            } else {
                res.status(204).json({
                    message: `no books found`,
                    data: books
                })
            }

        })
        .catch(err => errorHelper(err, res))
}

const getBookById = (req, res, next) => {
    findBookPromise(req, res, next)
        .then(book => {
            res.status(200).json({
                message: `success get a single book`,
                data: book
            })
        })
}

const addBook = (req, res, next) => {
    const { isbn, title, author, category, stock } = req.body
    Book.create({ isbn, title, author, category, stock })
        .then(newBook => {
            res.status(201).json({
                message: `A new book added successfully`,
                data: newBook
            })
        })
        .catch(err => errorHelper(err, res))
}

const editBook = (req, res, next) => {
    const { isbn, title, author, category } = req.body
    findBookPromise(req, res, next)
        .then(book => {
            book.isbn = isbn
            book.title = title
            book.author = author
            book.category = category

            book.save()
                .then(updatedBook => res.status(200).json({
                    message: `Book updated successfully`,
                    data: updatedBook
                }))
                .catch(err => errorHelper(err, res))
        })
}

const deleteBook = (req, res, next) => {
    findBookPromise(req, res, next)
        .then(book => {
            Book.deleteOne({ _id: book._id })
                .then(changes => res.status(200).json({
                    message: `Book deleted successfully`
                }))
                .catch(err => errorHelper(err, res))
        })
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
    editBook,
    deleteBook
}