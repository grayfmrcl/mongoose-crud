const Transaction = require('../models/transaction')

const errorHelper = require('../helpers/errorHelper')
const dateHelper = require('../helpers/dateHelper')

const findTransactionPromise = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Transaction.findById(req.params.id)
            .populate('member')    
            .populate('booklist')
            .then(transaction => {
                if (transaction) {
                    resolve(transaction)
                } else {
                    res.status(204).json({
                        message: `no transaction found`,
                        data: transaction
                    })
                }
            })
            .catch(err => errorHelper(err, res))
    })
}

const getTransactions = (req, res, next) => {
    Transaction.find()
        .populate('member')
        .populate('booklist')
        .then(transactions => {
            if (transactions.length > 0) {
                res.status(200).json({
                    message: `success get all transactions`,
                    data: transactions
                })
            } else {
                res.status(200).json({
                    message: `no transaction found`,
                    data: transactions
                })
            }
        })
        .catch(err => errorHelper(err, res))
}

const getTransactionById = (req, res, next) => {
    findTransactionPromise(req, res, next)
        .then(transaction => {
            res.status(200).json({
                message: `success get a single transaction`,
                data: transaction
            })
        })
}

const addTransaction = (req, res, next) => {
    const { member, days, booklist } = req.body
    Transaction.create({ 
            member, 
            days, 
            out_date: new Date, 
            due_date: null,
            in_date: null,
            fine: 0,
            booklist
        })
        .then(newTransaction => {
            res.status(201).json({
                message: `new transaction added successfully`,
                data: newTransaction
            })
        })
        .catch(err => errorHelper(err, res))
}

const editTransaction = (req, res, next) => {
    const { member, days, booklist } = req.body
    findTransactionPromise(req, res, next)
        .then(transaction => {
            transaction.member = member
            transaction.days = days
            transaction.booklist = booklist

            transaction.save()
                .then(updatedTransaction => {
                    res.status(200).json({
                        message: `transaction edited successfully`,
                        data: updatedTransaction
                    })
                })
                .catch(err => errorHelper(err, res))
        })
}

const deleteTransaction = (req, res, next) => {
    findTransactionPromise(req, res, next)
        .then(transaction => {
            Transaction.deleteOne({ _id: transaction._id })
                .then(changes => {
                    res.status(200).json({
                        message: `transaction deleted successfully`
                    })
                })
                .catch(err => errorHelper(err, res))
        })
}

const returnBooks = (req, res, next) => {
    findTransactionPromise(req, res, next)
        .then(transaction => {
            let totalDays = dateHelper.diffDays(new Date, transaction.due_date)
            transaction.in_date = new Date
            transaction.fine = totalDays > 0 ? totalDays * 1000 : 0

            transaction.save()
                .then(changes => {
                    res.status(200).json({
                        message: `books returned successfully`,
                        data: changes
                    })
                })
                .catch(err => errorHelper(err, res))
        })
}

module.exports = {
    getTransactions,
    getTransactionById,
    addTransaction,
    editTransaction,
    deleteTransaction,
    returnBooks
}