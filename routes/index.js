const routes = require('express').Router()

const books = require('./books')
const customers = require('./customers')
const transactions = require('./transactions')

routes.get('/', (req, res, next) => {
    res.status(200).json({
        msg: `welcome to the library`
    })
})

routes.use('/api/books', books)
routes.use('/api/customers', customers)
routes.use('/api/transactions', transactions)

module.exports = routes