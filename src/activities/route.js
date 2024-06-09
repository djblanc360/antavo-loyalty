/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
routes.use(cors());

routes.get('/', (req, res, next) => {
    console.log('root');
    // console.log('status: ' + res.status);
    return res.status(200).json({
      message: "Hello from root!",
    });
});

routes.post('/', (req, res, next) => {
    console.log(req.body.email,'- in customers POST activities: body is ',req.body);

    const customer = req.body;
  
    const activities = require('./activities.js');
    const response = activities.getActivities(customer, res);
    response.then((response) => {
      console.log(customer.email,'- activities.js response',response);
      // end_response = create_response;
      return res.status(200).json({
        response
      })
    })
});

routes.post('/challenges', (req, res, next) => {
  console.log(req.body.email,'- in customers POST challenges: body is ',req.body);

  const customer = req.body;

  const activities = require('./challenges.js');
  const response = activities.getChallenges(customer, res);
  response.then((response) => {
    console.log(customer.email,'- challenges.js response',response);
    // end_response = create_response;
    return res.status(200).json({
      response
    })
  })

});

routes.post('/rewards', (req, res, next) => {
  console.log(req.body.email,'- in customers POST reward signed: body is ',req.body);

  const customer = req.body;

  const rewards = require('./rewards.js');
  const response = rewards.getRewards(customer, res);
  response.then((response) => {
    console.log(customer.email,'- rewards.js response',response);
    // end_response = create_response;
    return res.status(200).json({
      response
    })
  })

});

routes.post('/social_follow', (req, res, next) => {
    console.log(req.body.email,'- in customers POST social_follow: body is ',req.body);
  
    const customer = req.body;
  
    const activities = require('./social_follow.js');
    const response = activities.getSocialFollow(customer, res);
    response.then((response) => {
      console.log(customer.email,'- social_follow.js response',response);
      // end_response = create_response;
      return res.status(200).json({
        response
      })
    })
  
});

routes.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found in customer route.js",
  });
});

module.exports = routes;