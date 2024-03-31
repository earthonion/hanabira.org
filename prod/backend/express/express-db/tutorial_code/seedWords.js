
// database seeding file, to be run separately:
// how to check if populated correctly
//mongo
//show dbs           (movieApp)
//use movieApp
//show collections   (products)
//db.products.find({})




const mongoose = require('mongoose');
const { db } = require('./models/product')
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Mongoose connection ERROR!!!!")
        console.log(err)
    })

// insert one 
//const p = new Product({
//    name: 'Ruby Grapefruit',
//    price: 1.99,
//    category: 'fruit'
//})
//
//p.save().then(p => { console.log(p) }).catch(e => { console.log(e) })



// insert many

const seedProducts = [
    {
        name: 'Gold Coconut',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Hot Carrot',
        price: 1.99,
        category: 'vegetable'
    },
    {
        name: 'Bad Apple',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Old Orange',
        price: 1.99,
        category: 'vegetable'
    },
]

// insert
Product.insertMany(seedProducts)
    .then(p => { console.log(p) })
    .catch(e => { console.log(e) })













