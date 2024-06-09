/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


routes.post('/checkout', async (req, res, next) => {
  try {
    const data = req.body;

    const reward = require('./checkout.js');
    const response = await reward.opt_in(data, res);
    console.log(data.email,'- /checkout response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in rewards/checkout',err)
    res.status(500).send('Something went wrong in rewards/checkout')
  }
});

routes.post('/checkout_accept', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./checkout_accept.js');
      const response = await reward.opt_in(data, res);
      console.log(data.email,'- /checkout_accept response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/checkout_accept',err)
      res.status(500).send('Something went wrong in rewards/checkout_accept')
    }
  });

routes.post('/checkout_accept_item', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./checkout_accept_item.js');
      const response = await reward.opt_in(data, res);
      console.log(data.email,'- /checkout_accept_item response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/checkout_accept_item',err)
      res.status(500).send('Something went wrong in rewards/checkout_accept_item')
    }
  });

routes.post('/checkout_item', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./checkout_item.js');
      const response = await reward.opt_in(data, res);
      console.log(data.email,'- /checkout_item response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/checkout_item',err)
      res.status(500).send('Something went wrong in rewards/checkout_item')
    }
  });

  
  routes.post('/checkout_reject', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./checkout_reject.js');
      const response = await reward.opt_in(data, res);
      console.log(data.email,'- /checkout_reject response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/checkout_reject',err)
      res.status(500).send('Something went wrong in rewards/checkout_reject')
    }
  });

routes.post('/checkout_update', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./checkout_update.js');
      const response = await reward.opt_in(data, res);
      console.log(data.email,'- /checkout_update response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/checkout_update',err)
      res.status(500).send('Something went wrong in rewards/checkout_update')
    }
  });


  routes.post('/checkout_update_item', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./checkout_update_item.js');
      const response = await reward.opt_in(data, res);
      console.log(data.email,'- /checkout_update_item response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/checkout_update_item',err)
      res.status(500).send('Something went wrong in rewards/checkout_update_item')
    }
  });

module.exports = routes;