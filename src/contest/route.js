/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


routes.post('/check_contest', async (req, res, next) => {
  try {
    const data = req.body;

    const reward = require('./check_contest.js');
    const response = await reward.opt_in(data, res);
    console.log(data.email,'- /check_contest response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in rewards/check_contest',err)
    res.status(500).send('Something went wrong in rewards//check_contest')
  }
});



module.exports = routes;