/* global shopify_token, shopify_auth, shopify_url, shopify_rest */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
routes.use(cors());

routes.get('/', (req, res, next) => {
  // console.log('root');
  // console.log('status: ' + res.status);
  return res.status(200).json({
    message: "Hello from root!",
  });
});


routes.post('/profile', async (req, res, next) => {
  try {


    // console.log(req.body.email,'- shopify POST profile: body is ',req.body);

    const customer = req.body;

    let profile = require('./profile.js');
    let response = await profile.customerData(customer, res);
    // console.log(customer.email,'- profile customerData response',response);

    return res.status(200).json({
        response
    });

    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in shopify/profile endpoint',err)
    res.status(500).send('Something went wrong in shopify/profile endpoint')
  }
})

routes.post('/update', async (req, res, next) => {
  try {


    // console.log(req.body.email,'- shopify PUT update: body is ',req.body);

    const customer = req.body;

    let profile = require('./profile.js');
    let response = await profile.updateProfile(customer, res);
    // console.log(customer.email,'- profile updateCustomer response',response);

    return res.status(200).json({
        response
    });

    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in shopify/update.js endpoint',err)
    res.status(500).send('Something went wrong in shopify/update.js endpoint')
  }
})


routes.post('/create', async (req, res, next) => {
    try {
  
  
      // console.log(req.body.email,'- shopify POST create: body is ',req.body);
  
      const customer = req.body;
  
      let create = require('./create.js');
      let response = await create.createCustomer(customer, res);
      // console.log(customer.email,'- create response',response);
      // console.log(response);
  
      return res.status(200).json({
          response
      });
  
      
    } catch (err) {
      // console.log(req.body.email,'- Something went wrong in shopify/create.js',err)
      res.status(500).send('Something went wrong in shopify/create.js')
    }
  })

routes.post('/backup_add_tags', async (req, res, next) => {
    try {
  
  
      // console.log(req.body.email,'- shopify add tags: body is ',req.body);
  
    //   const customer = req.body;
  
      let tier = require('./profile.js');
      let update = require('./update_tags.js');

      const customer = await tier.customerData(req.body, res);

      const id = customer.data.customers.edges[0].node.id;
      // console.log(customer.email,'- customer id ',id);

      const response = await update.addTags(req.body.email,id, req.body.tags, res);
      // console.log(customer.email,'- tag response',response);
  
      return res.status(200).json({
        response
      });
  
      
    } catch (err) {
      // console.log(req.body.email,'- failed to add tags',err)
      res.status(500).send('failed to add tags')
    }
  })

  routes.post('/backup_remove_tags', async (req, res, next) => {
    try {
  
  
      console.log(req.body.email,'- shopify remove tags: body is ',req.body);
  
      let tier = require('./profile.js');
      let update = require('./update_tags.js');

      const customer = await tier.customerData(req.body, res);

      const id = customer.data.customers.edges[0].node.id;
      console.log(req.body.email,'- shopify remove tags: ID is ',id);

      const response = await update.removeTags(req.body.email, id, req.body.tags, res);


      return res.status(200).json({
          response
      });
  
      
    } catch (err) {
      // console.log(req.body.email,'- failed to remove tags',err)
      res.status(500).send('failed to remove tags')
    }
  })

  routes.post('/add_tags', (req, res, next) => {

    // console.log(req.body.email,'- shopify remove tags: body is ',req.body);

    let tier = require('./profile.js');
    let update = require('./update_tags.js');

    const customer = tier.customerData(req.body, res);
    customer.then((customerResponse) => {
      const id = customerResponse.data.customers.edges[0].node.id;
      console.log(req.body.email,'- shopify remove tags: ID is ',id);

      const response = update.addTags(req.body.email, id, req.body.tags, res);
      response.then((tagResponse) => {
        console.log(req.body.email,'- tag response',tagResponse);

        return res.status(200).json({
          tagResponse
        });
      });
    });
    
  })

  routes.post('/remove_tags', (req, res, next) => {

      console.log(req.body.email,'- shopify remove tags: body is ',req.body);
  
      let tier = require('./profile.js');
      let update = require('./update_tags.js');

      const customer = tier.customerData(req.body, res);
      customer.then((customerResponse) => {
        const id = customerResponse.data.customers.edges[0].node.id;
        console.log(req.body.email,'- shopify remove tags: ID is ',id);

        const response = update.removeTags(req.body.email, id, req.body.tags, res);
        response.then((tagResponse) => {
          console.log(req.body.email,'- tag response',tagResponse);

          return res.status(200).json({
            tagResponse
          });
        });
      });
      

  })



  routes.post('/token_create', async (req, res, next) => {
    try {
  
  
      // console.log('body is ',req.body);
  
      const customer = req.body;
  
      let token_create = require('./token_create.js');
      let response = await token_create.createCustomer(customer, res);
      // console.log('token_create response');
      // console.log(response);
  
      return res.status(200).json({
          response
      });
  
      
    } catch (err) {
      // console.log(err)
      res.status(500).send('token_create failed at endpoint')
    }
  })

routes.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found in customer route.js",
  });
});

module.exports = routes;