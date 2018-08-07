# mongoose-crud

## setup
Run the following command to setup the database

`node setup.js` - to create the collections needed  
`node seed.js` - to seed the collection

## routes
### books
| Route          | HTTP   | Description       |
|----------------|--------|-------------------|
| /api/books     | GET    | Get all the books |
| /api/books/:id | GET    | Get a single book |
| /api/books/    | POST   | Add a book        |
| /api/books/:id | PUT    | Edit a book       |
| /api/books/:id | DELETE | Delete a book     |

### customers
| Route              | HTTP   | Description           |
|--------------------|--------|-----------------------|
| /api/customers     | GET    | Get all the customers |
| /api/customers/:id | GET    | Get a single customer |
| /api/customers/    | POST   | Add a customer        |
| /api/customers/:id | PUT    | Edit a customer       |
| /api/customers/:id | DELETE | Delete a customer     |

### transactions
| Route                        | HTTP   | Description               |
|------------------------------|--------|---------------------------|
| /api/transactions            | GET    | Get all the transactions  |
| /api/transactions/:id        | GET    | Get a single transactions |
| /api/transactions/           | POST   | Add a transactions        |
| /api/transactions/:id        | PUT    | Edit a transactions       |
| /api/transactions/:id        | DELETE | Delete a transactions     |
| /api/transactions/:id/return | POST   | Return books     |