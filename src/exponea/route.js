/* global exponea_token, exponea_auth */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
routes.use(cors());

routes.post('/attributes', async (req, res, next) => {
  try {
    const data = req.body;

    const reward = require('./attributes.js');
    const response = await reward.customerAttributes(data, res);
    // console.log(data.email,'- /attributes response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in exponea/attributes endpoint',err)
    res.status(500).send('Something went wrong in  exponea/attributes endpoint')
  }
});

module.exports = routes;