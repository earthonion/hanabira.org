const express = require('express');

const { connectDB } = require('./config/db');
const { wordRoutes } = require('./routes/wordRoutes');

//const { getAllWords } = require('./controllers/wordsController');


// import models, so we can form relationships in db searches
const { Word } = require('./models/word');
const { Sentence } = require('./models/sentence');


const path = require('path');
const cors = require('cors');

// -----------  General prep and vars  ------------------ //
const router = express.Router();
const port = 8000;          // port our backend is running on
const originPort = 3000;    // port the fronend app is running on
const app = express();

var corsOptions = {
  origin: ['http://localhost:'+originPort],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));


// connect to DB before we expose our API Express endpoints
connectDB();




// ---------------- Function Definitions ------------------ //
const getAllWords = async (req, res) => {
  try {
    // parameters from request
    const pTag = req.query.p_tag;
    const sTag = req.query.s_tag;
    console.log('p_tag: ' + pTag);
    console.log('s_tag: ' + sTag);

    let words;
    if(pTag && sTag) {
      // find subset of words based on parameters
      words = await Word.find({ p_tag: pTag, s_tag: sTag }).populate("sentences");
    } else {
      // find all words when no parameters provided
      words = await Word.find({}).populate("sentences");
    }

    console.log('words payload: ' + words);

    res.status(200).json({
      words,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  } finally {
    // any cleanup actions
  }
};





// --------------------- API ENDPOINTS --------------------- //
app.get('/words', (req, res) => {
  //res.send('Hello World!')
  // call like to get subset of words, call without params to get all words
  //curl -X GET http://localhost:8000/words
  //curl -X GET 'http://localhost:8000/words?p_tag=JLPT_N3&s_tag=100'    //must use quotes

  console.log('received GET request');
  getAllWords(req, res)
})



// -------------------------------------------------------- //
// start the Express server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })