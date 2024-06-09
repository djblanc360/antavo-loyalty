/* global api_key, api_url */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();

var cors = require('cors');
routes.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

routes.get('/', (req, res, next) => {
  // console.log('root');
  // console.log('status: ' + res.status);
  return res.status(200).json({
    message: "Hello from root!",
  });
});



routes.post('/opt_in', async (req, res, next) => {
  try {
    let data = req.body;

    let account = require('./opt_in.js');
    let response = await account.opt_in(data, res);
    // console.log('/opt_in response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(err)
    res.status(500).send('Something went wrong')
  }
});

routes.post('/opt_in_webhook', async (req, res, next) => {
  try {
    let data = req.body;

    let account = require('./opt_in_webhook.js');
    let response = await account.opt_in(data, res);
    // console.log('/opt_in response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(err)
    res.status(500).send('Something went wrong')
  }
})


routes.post('/opt_out_test', async (req, res, next) => {
    try {
      let data = req.body;
  
      let account = require('./opt_out.js');
      let response = await account.opt_out(data, res);
      // console.log('account response');
      // console.log(response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      // console.log(err)
      res.status(500).send('Something went wrong')
    }
  });

  routes.post('/opt_out', (req, res, next) => {

      let data = req.body;
  
      let account = require('./opt_out.js');
      const response = account.opt_out(data, res);
      // console.log('account response');
      // console.log(response);
      response.then((result) => {
        console.log(data.email, '- /opt_out_test',result)
        return res.status(200).json({
          result
        })
      })
  

  });

  // update user's profile with specified properties in payload
routes.post('/profile', (req, res, next) => {
  console.log(req.body.email,'- in customers POST profile: body is ',req.body);
  
  const customer = req.body;

  const profile = require('./profile.js');
  const response = profile.postProfile(customer, res);
  response.then((response) => {
    console.log(customer.email,'- profile.js response',response);
    return res.status(200).json({
      response
    })
  })

});

// return a list of users that match the specified properties in payload
routes.post('/identify', (req, res, next) => {
  console.log(req.body.email,'- in customers POST identify: body is ',req.body);
  
  const customer = req.body;

  const profile = require('./profile.js');
  const response = profile.getProfile(customer, res);
  response.then((response) => {
    console.log(customer.email,'- profile.js response',response);
    return res.status(200).json({
      response
    })
  })

});

routes.post('/profile-backup', (req, res, next) => {
  console.log(req.body.email,'- in customers POST profile: body is ',req.body);
  
  const customer = req.body;

  const profile = require('./profile-backup.js');
  const response = profile.postProfile(customer, res);
  response.then((response) => {
    console.log(customer.email,'- profile.js response',response);
    return res.status(200).json({
      response
    })
  })

});

routes.post('/profile_complete', async (req, res, next) => {
    try {
      let data = req.body;
  
      let account = require('./profile_complete.js');
      let response = await account.profile_complete(data, res);
      // console.log(data.email,'- /profile_complete response',response);
  
      return res.status(200).json({
        response
      });
      
    } catch (err) {
      // console.log(req.body.email,'- ',err)
      res.status(500).send('failed in profile_complet endpoint')
    }
  });



routes.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found in customer route.js",
  });
});

module.exports = routes;