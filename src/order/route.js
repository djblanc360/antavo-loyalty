/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

routes.post('/refund', async (req, res, next) => {
  try {
    const data = req.body;

    const order = require('./refund.js');
    const response = await order.refund(data, res);
    // console.log(data.email,'- /refund response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in rewards/refund',err)
    res.status(500).send('Something went wrong in rewards/refund')
  }
});

routes.post('/refund_item', async (req, res, next) => {
  try {
    const data = req.body;

    const order = require('./refund_item.js');
    const response = await order.refund_item(data, res);
    // console.log(data.email,'- /refund_item response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in rewards/refund_item',err)
    res.status(500).send('Something went wrong in rewards/refund_item')
  }
});

routes.post('/shopify_refund', async (req, res, next) => {
  try {
    const data = req.body;

    const order = require('./shopify_refund.js');
    const response = await order.shopify_refund(data, res);
    // console.log(data.email,'- /shopify_refund response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in rewards/shopify_refund',err)
    res.status(500).send('Something went wrong in rewards/shopify_refund')
  }
});



module.exports = routes;