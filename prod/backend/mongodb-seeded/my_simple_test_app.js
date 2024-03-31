
// how to create new database:

const mongoose = require('mongoose');


//const Product = require('./models/product');




mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Mongoose connection ERROR!!!!")
        console.log(err)
    })


// schema creation













