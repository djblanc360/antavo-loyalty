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


routes.post('/register', (req, res, next) => {
    
  console.log(req.body.email,'- in customer/register',req.body);

  const customer = req.body;

  let create = require('./create.js');
  const response = create.createCustomer(customer, res);


  response.then((responseAntavo) => {
  console.log(customer.email,'- register response',response);


  let tier = require('../shopify/profile.js');
  let update = require('../shopify/update_tags.js');
  let createShopify = require('../shopify/create.js');

  const shopify = tier.customerData(customer, res);

  shopify.then((responseShopify) => {
  console.log(customer.email,'- shopify response',responseShopify);

  // let end_response;

  if(responseShopify === null) {

    console.log(customer.email,'- create a new customer with new tags',customer);

      
    const create_response = createShopify.createCustomer(customer, res);
    create_response.then((createResponse) => {
    console.log(customer.email,'- create response',create_response);
    // end_response = create_response;
    return res.status(200).json({
      "antavo":responseAntavo,
      "shopify":createResponse
    });
    });

    } else {

      console.log(customer.email,'- retrieve existing customer and add tags',customer);
      console.log(customer.email,'- shopify response',responseShopify.data.customers.edges[0].node);

      const id = responseShopify.data.customers.edges[0].node.id;
      // console.log(customer.email,'- customer id ',id);

      const tag_response = update.addTags(customer.email,id, ['loyalty_member', 'tier_1'], res);
        tag_response.then((tagResponse) => {
      console.log(customer.email,'- tag response',tagResponse);

      // end_response = shopify.data.customers.edges[0].node;
      return res.status(200).json({
        "antavo":responseAntavo,
        "shopify":responseShopify.data.customers.edges[0].node
      });
        });

    }
  });

 });

  // return res.status(200).json({
  //   "antavo":response,
  //   "shopify":end_response
  // });

  

});

// opt into antavo. if user exist in Shopify, update tags. if not, create Shopify account.
routes.post('/register-backup', async (req, res, next) => {
  try {


    console.log(req.body.email,'- in customer/register',req.body);

    const customer = req.body;

    let create = require('./create.js');
    const response = await create.createCustomer(customer, res);


    
    console.log(customer.email,'- register response',response);


    let tier = require('../shopify/profile.js');
    let update = require('../shopify/update_tags.js');
    let createShopify = require('../shopify/create.js');

    const shopify = await tier.customerData(customer, res);
    console.log(customer.email,'- shopify response',shopify);

    // let end_response;

    if(shopify === null) {

      console.log(customer.email,'- create a new customer with new tags',customer);
  
        
      const create_response = await createShopify.createCustomer(customer, res);
      console.log(customer.email,'- create response',create_response);
      // end_response = create_response;
      return res.status(200).json({
        "antavo":response,
        "shopify":create_response
      });

      } else {

        console.log(customer.email,'- retrieve existing customer and add tags',customer);
        console.log(customer.email,'- shopify response',shopify.data.customers.edges[0].node);
  
        const id = shopify.data.customers.edges[0].node.id;
        // console.log(customer.email,'- customer id ',id);

        if(customer.store_name == 'roark.com') {
          const tag_response = await update.addTags(customer.email,id, ['loyalty_member', 'tier_1'], res); // Scout
        } else {
          const tag_response = await update.addTags(customer.email,id, ['loyalty_member', 'tier_1'], res); // Cruiser
        }
        console.log(customer.email,'- tag response',tag_response);
  
        // end_response = shopify.data.customers.edges[0].node;
        return res.status(200).json({
          "antavo":response,
          "shopify":shopify.data.customers.edges[0].node
        });

      }



    // return res.status(200).json({
    //   "antavo":response,
    //   "shopify":end_response
    // });

    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in customer/register',err)
    res.status(500).send(' Something went wrong in customer/register')
  }
});

routes.post('/profile', (req, res, next) => {
  console.log(req.body.email,'- in customers POST profile: body is ',req.body);

  const customer = req.body;

  const profile = require('./profile-signed.js');
  const response = profile.getProfile(customer, res);
  response.then((response) => {
    console.log(customer.email,'- /profile response',response);
    // end_response = create_response;
    return res.status(200).json({
      response
    })
  })

});

routes.post('/profile-signed', (req, res, next) => {
    console.log(req.body.email,'- in customers POST profile signed: body is ',req.body);
  
    const customer = req.body;

    const profile = require('./profile-signed.js');
    const response = profile.getProfile(customer, res);
    response.then((response) => {
      console.log(customer.email,'- profile-signed.js response',response);
      // end_response = create_response;
      return res.status(200).json({
        response
      })
    })

});


routes.post('/rewards-signed', (req, res, next) => {
  console.log(req.body.email,'- in customers POST reward signed: body is ',req.body);

  const customer = req.body;

  const rewards = require('./rewards-signed.js');
  const response = rewards.getRewards(customer, res);
  response.then((response) => {
    console.log(customer.email,'- rewards-signed.js response',response);
    // end_response = create_response;
    return res.status(200).json({
      response
    })
  })

});

routes.post('/mark_employee', async (req, res, next) => {
  try {

    // console.log('in customers /mark_employee. body is: ',req.body);
  
    const customer = req.body;

    let mark_employee = require('./mark_employee.js');
    let response = await mark_employee.mark_employee(customer, res);
    // console.log('mark_employees response');
    // console.log(response);

    return res.status(200).json({
      response
    });

    
  } catch (err) {
    // console.log(err)
    res.status(500).send('Failed to mark employee in endpoint')
  }

});


routes.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found in customer route.js",
  });
});

module.exports = routes;