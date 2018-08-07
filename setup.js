const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

const dbName = 'library'

MongoClient.connect(url, (err, db) => {
    if (err) throw err

    const dbo = db.db(dbName)
    dbo.createCollection('books', (err, res) => {
        if (err) throw err

        console.log("Books collection created!")
        db.close()
    })
})