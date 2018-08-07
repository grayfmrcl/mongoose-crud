const mongoose = require('mongoose')

const { addDays } = require('../helpers/dateHelper')

const Schema = mongoose.Schema
const transactionSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Customer' },
    days: Number,
    out_date: Date,
    due_date: Date,
    in_date: Date,
    fine: Number,
    booklist: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

transactionSchema.pre('save', function (next) {
    this.due_date = addDays(this.out_date, this.days)
    next()
})

module.exports = mongoose.model('Transaction', transactionSchema)