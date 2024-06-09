/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


routes.post('/annual_member_gift_redeemed', async (req, res, next) => {
  try {
    const data = req.body;

    const reward = require('./annual_member_gift_redeemed.js');
    const response = await reward.annual_member_gift_redeemed(data, res);
    // console.log(data.email,'- /annual_member_gift_redeemed response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in rewards/annual_member_gift_redeemed',err)
    res.status(500).send('Something went wrong in rewards/annual_member_gift_redeemed')
  }
});

routes.post('/birthday_gift_redeemed', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./birthday_gift_redeemed.js');
      const response = await reward.birthday_gift_redeemed(data, res);
      // console.log(data.email,'- /birthday_gift_redeemed response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      // console.log(req.body.email,'- Something went wrong in rewards/birthday_gift_redeemed',err)
      res.status(500).send('Something went wrong in rewards/birthday_gift_redeemed')
    }
  });

  routes.post('/invite_only_experience', async (req, res, next) => {
    try {
      const data = req.body;
  
      const reward = require('./invite_only_experience.js');
      const response = await reward.invite_only_experience(data, res);
      // console.log(data.email,'- /invite_only_experience response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      // console.log(req.body.email,'- Something went wrong in rewards/invite_only_experience',err)
      res.status(500).send('Something went wrong in rewards/invite_only_experience')
    }
  });

module.exports = routes;