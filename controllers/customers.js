const Customer = require('../models/customer')
const errorHelper = require('../helpers/errorHelper')

const findCustomerPromise = (req, res, next) => {
    return new Promise((resolve, reject) => {
        Customer.findById(req.params.id)
            .then(customer => {
                if (customer) {
                    resolve(customer)
                } else {
                    res.status(204).json({
                        message: `no customer found`,
                        data: customer
                    })
                }
            })
            .catch(err => errorHelper(err, res))
    })
}

const getCustomers = (req, res, next) => {
    Customer.find()
        .then(customers => {
            if (customers.length > 0) {
                res.status(200).json({
                    message: `success get all customers`,
                    data: customers
                })
            } else {
                res.status(200).json({
                    message: `no customers found`,
                    data: customers
                })
            }
        })
        .catch(err => errorHelper(err, res))
}

const getCustomerById = (req, res, next) => {
    findCustomerPromise(req, res, next)
        .then(customer => {
            res.status(200).json({
                message: `success get a single customer`,
                data: customer
            })
        })
}

const addCustomer = (req, res, next) => {
    const { name, memberid, address, zipcode, phone } = req.body
    Customer.create({ name, memberid, address, zipcode, phone })
        .then(newCustomer => {
            res.status(201).json({
                message: `new customer added successfully`,
                data: newCustomer
            })
        })
        .catch(err => errorHelper(err, res))
}

const editCustomer = (req, res, next) => {
    const { name, memberid, address, zipcode, phone } = req.body
    findCustomerPromise(req, res, next)
        .then(customer => {
            customer.name = name
            customer.memberid = memberid
            customer.address = address
            customer.zipcode = zipcode
            customer.phone = phone

            customer.save()
                .then(updatedCustomer => {
                    res.status(200).json({
                        message: `customer edited successfully`,
                        data: updatedCustomer
                    })
                })
                .catch(err => errorHelper(err, res))
        })
}

const deleteCustomer = (req, res, next) => {
    findCustomerPromise(req, res, next)
        .then(customer => {
            Customer.deleteOne({ _id: customer._id })
                .then(changes => {
                    res.status(200).json({
                        message: `customer deleted successfully`
                    })
                })
                .catch(err => errorHelper(err, res))
        })
}

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    editCustomer,
    deleteCustomer
}