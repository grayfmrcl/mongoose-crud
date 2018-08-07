const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

const dbName = 'library'
const collectionName = 'books'

MongoClient.connect(url, (err, db) => {
    if (err) throw err

    const dbo = db.db(dbName)
    const collection = dbo.collection(collectionName)

    collection.insert([
        {
            "isbn" : "978-1-60309-057-5",
            "title" : "Dragon Puncher",
            "author" : "James Kochalka",
            "category" : "All Ages",
            "stock" : 3
          },
          {
            "isbn" : "978-1-891830-77-8",
            "title" : "Every Girl is the End of the World for Me",
            "author" : "Jeffrey Brown",
            "category" : "Mature (16+)",
            "stock" : 5
          }
          
    ], (err, res) => {
        if (err) throw err
        console.log("Inserted 2 books into the books collection")
        db.close()
    })
})