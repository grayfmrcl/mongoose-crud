const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/library')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db!')
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

