const customers = require('express').Router()

const {
    getCustomers,
    getCustomerById,
    addCustomer,
    editCustomer,
    deleteCustomer
} = require('../controllers/customers')

customers.get('/', getCustomers)
customers.get('/:id', getCustomerById)
customers.post('/', addCustomer)
customers.put('/:id', editCustomer)
customers.delete('/:id', deleteCustomer)

module.exports = customers