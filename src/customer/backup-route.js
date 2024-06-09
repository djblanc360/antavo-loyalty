/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
routes.use(cors());

routes.get('/', (req, res, next) => {
  console.log('root');
  console.log('status: ' + res.status);
  return res.status(200).json({
    message: "Hello from root!",
  });
});

routes.get('/list', async (req, res, next) => {
  console.log('in list GET');
  console.log('body is ',req.body);

  const customer = req.body;


});


routes.post('/register', async (req, res, next) => {
  try {


    console.log(req.body.email,'- in customer/register',req.body);

    const customer = req.body;

    let create = require('./create.js');
    let tier = require('../shopify/profile.js');
    let update = require('../shopify/update_tags.js');
    let createShopify = require('../shopify/create.js');
    let end_response;

    const response = await create.createCustomer(customer, res);

    response.then((responseData) => {

      console.log(customer.email,'- create response',response);

  
      const shopify = await tier.customerData(customer, res);

      shopify.then((shopifyData) => {
        console.log(customer.email,'- shopify response',shopify);
        if(shopify.data.customers.edges.length > 0) {
          console.log(customer.email,'- retrieve existing customer and add tags',customer);
    
          const id = shopify.data.customers.edges[0].node.id;
          console.log(customer.email,'- customer id ',id);
    
          const tag_response = await update.addTags(customer.email,id, ['loyalty_member'], res);
          tag_response.then((tag_responseData) => {
            console.log(customer.email,'- tag response',tag_response);
    
            end_response = shopify.data.customers.edges[0].node;
  
            return res.status(200).json({
              "antavo":response,
              "shopify":end_response
            });
    
          })

        } else {
    
          console.log(customer.email,'- create a new customer with new tags',customer);
    
          
          const create_response = await createShopify.createCustomer(customer, res);
          create_response.then((create_responseData) => {
            console.log(customer.email,'- create response',create_response);
            end_response = create_response;
  
            return res.status(200).json({
              "antavo":response,
              "shopify":end_response
            });
          })

        }

        
      })
      
    });

    
  } catch (err) {
    console.log(customer.email,'- Something went wrong in customer/register',err)
    res.status(500).send(' Something went wrong in customer/register')
  }
});

routes.post('/profile', async (req, res, next) => {
  try {

    console.log(req.body.email,'- in customers POST profile: body is ',req.body);
  
    const customer = req.body;

    let profile = require('./profile.js');
    let response = await profile.getProfile(customer, res);
    console.log(customer.email,'- profile response',response);

    return res.status(200).json({
      response
    });

    
  } catch (err) {
    console.log(req.body.email,'Something went wrong in customer/profile.js ',err)
    res.status(500).send('Something went wrong in customer/profile.js')
  }

});

routes.post('/rewards', async (req, res, next) => {
  try {

    console.log(req.body.email,'- in customers GET rewards. body is: ',req.body);
  
    const customer = req.body;

    let rewards = require('./rewards.js');
    let response = await rewards.getRewards(customer, res);
    console.log(customer.email,'- rewards response',response);

    return res.status(200).json({
      response
    });

    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in customer/rewards',err)
    res.status(500).send('Something went wrong in customer/rewards')
  }

});

routes.post('/mark_employee', async (req, res, next) => {
  try {

    console.log('in customers /mark_employee. body is: ',req.body);
  
    const customer = req.body;

    let mark_employee = require('./mark_employee.js');
    let response = await mark_employee.mark_employee(customer, res);
    console.log('mark_employees response');
    console.log(response);

    return res.status(200).json({
      response
    });

    
  } catch (err) {
    console.log(err)
    res.status(500).send('Failed to mark employee in endpoint')
  }

});


routes.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found in customer route.js",
  });
});

module.exports = routes;