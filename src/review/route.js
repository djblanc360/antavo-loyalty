/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

routes.get('/', (req, res, next) => {
  // console.log('root');
  // console.log('status: ' + res.status);
  return res.status(200).json({
    message: "Hello from root!",
  });
});



routes.post('/review_submit', async (req, res, next) => {
  try {
    let data = req.body;

    let review = require('./review_submit.js');
    let response = await review.review_submit(data, res);
    // console.log('review response', response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log('Something went wrong in review_submit endpoint',err)
    res.status(500).send('Something went wrong in review_submit endpoint')
  }
});



routes.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found in customer route.js",
  });
});

module.exports = routes;