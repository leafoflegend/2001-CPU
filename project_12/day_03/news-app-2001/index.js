require('dotenv').config();
const axios = require('axios');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { CURRENTS_API_KEY = '' } = process.env;
server.use(express.static('public'));

server.use(morgan('dev'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.get('/news', async (req, res) => {
  try {
    const {data} = await axios.get(`https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${CURRENTS_API_KEY}`);
    console.log('>>>>>>>>> data', data);
    
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({error})
  }
})

server.post('/news', async(req, res) => {
  try {
    console.log('>>>>>>>>> req.body', req.body);
    const {data} = await axios.get(`https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${CURRENTS_API_KEY}&category=${req.body.categories}`);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({error})
  }
})

const { PORT = 3030 } = process.env;

server.listen(PORT, () => {
  console.log('Oh my, we are listening!');
});
