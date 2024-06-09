/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


routes.post('/shopify_connect', (req, res, next) => {
  try {
    const data = req.body;

    const social = require('./shopify_connect.js');
    const response = social.shopify_connect(data, res);
    // console.log(data.email,'- /shopify_connect response',response);

    response.then((response) => {
      console.log(data.email,'- social/shopify_connect response', response);
      return res.status(200).json({
        response
      })
    })
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in rewards/shopify_connect',err)
    res.status(500).send('Something went wrong in rewards/shopify_connect')
  }
});

routes.post('/shopify_follow', (req, res, next) => {
    try {
      const data = req.body;
  
      const social = require('./shopify_follow.js');
      const response = await social.shopify_follow(data, res);
      // console.log(data.email,'- /shopify_follow response',response);
  
      response.then((response) => {
        console.log(data.email,'- social/shopify_follow response', response);
        return res.status(200).json({
          response
        })
      })
      
    } catch (err) {
      console.log(req.body.email,'- Something went wrong in rewards/shopify_follow',err)
      res.status(500).send('Something went wrong in rewards/shopify_follow')
    }
  });

  // retrieve data to know if user is folowing your page
routes.post('instagram_confirm', (req, res, next) => {
  try {
    console.log(req.body.email,'- in social/instagram_confirm',req.body);

    const data = req.body;

    const social = require('./instagram.js');
    const response = social.confirm(data, res);
    // console.log(data.email,'- /events response',response);
    response.then((response) => {
      console.log(data.email,'- social/instagram_confirm response', response);
      return res.status(200).json({
        response
      })
    })
    
  } catch (err) {
    console.log('Something went wrong in social/instagram_confirm endpoint', err)
    res.status(500).send('Something went wrong in  social/instagram_confirm endpoint')
  }
})

module.exports = routes;