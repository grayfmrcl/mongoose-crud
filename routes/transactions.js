const transactions = require('express').Router()

const { 
    getTransactions,
    getTransactionById,
    addTransaction,
    editTransaction,
    deleteTransaction,
    returnBooks 
} = require('../controllers/transactions')


transactions.get('/', getTransactions)
transactions.get('/:id', getTransactionById)
transactions.post('/', addTransaction)
transactions.put('/:id', editTransaction)
transactions.delete('/:id', deleteTransaction)
transactions.post('/:id/return', returnBooks)

module.exports = transactions