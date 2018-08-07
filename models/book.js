const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    category: String,
    stock: Number
})

bookSchema.methods.borrowed = function(cb) {
    this.stock -= 1
    cb()
}

bookSchema.methods.returned = function(cb) {
    this.stock += 1
    cb()
}

module.exports = mongoose.model('Book', bookSchema)