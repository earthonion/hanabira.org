const mongoose = require('mongoose');

const connectDB = async () => {
  //const dbName = 'zenRelationships'
  const dbHost = 'localhost'
  const dbPort = 27018
  const dbName = 'zenRelationshipsAutomated'

  await mongoose
    .connect('mongodb://'+dbHost+':'+dbPort+'/'+dbName, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open.")
    })
    .catch(err => {
        console.log("Mongo Connection ERROR!!!!")
        console.log(err)
    });
};

//export default connectDB;
module.exports = { connectDB }