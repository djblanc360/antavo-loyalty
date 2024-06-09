/** pass environmental variables */
module.exports = {
  authenticate: function (req, res, next) {
      try {
          const customer = req.body;
          let api_key;
          let api_url;
          if(customer.store_name == 'olukai-store-dev.myshopify.com') {
              api_key = process.env.OLUKAI_ANTAVO_KEY_DEV;
              api_secret = process.env.OLUKAI_ANTAVO_SECRET_DEV;
              api_url = process.env.OLUKAI_ANTAVO_URL_DEV;
              api_region = process.env.OLUKAI_ANTAVO_REGION_DEV;
          }
          if(customer.store_name == 'olukai.com') { // remove when olukai has its own api key
              api_key = process.env.OLUKAI_ANTAVO_KEY;
              api_secret = process.env.OLUKAI_ANTAVO_SECRET;
              api_url = process.env.OLUKAI_ANTAVO_URL;
              api_region = process.env.OLUKAI_ANTAVO_REGION;
          }
          if(customer.store_name == 'vip.olukai.com') {
              api_key = process.env.OLUKAI_ANTAVO_KEY;
              api_secret = process.env.OLUKAI_ANTAVO_SECRET;
              api_url = process.env.OLUKAI_ANTAVO_URL;
              api_region = process.env.OLUKAI_ANTAVO_REGION;
          }
          if(customer.store_name == 'olukai.ca') {
            api_key = process.env.OLUKAI_ANTAVO_KEY;
            api_secret = process.env.OLUKAI_ANTAVO_SECRET;
            api_url = process.env.OLUKAI_ANTAVO_URL;
            api_region = process.env.OLUKAI_ANTAVO_REGION;
          }
          if(customer.store_name == 'vip.roark.com') {
            api_key = process.env.ROARK_ANTAVO_KEY;
            api_secret = process.env.ROARK_ANTAVO_SECRET;
            api_url = process.env.ROARK_ANTAVO_URL;
            api_region = process.env.ROARK_ANTAVO_REGION;
          }
          if(customer.store_name == 'roark.com') {
            api_key = process.env.ROARK_ANTAVO_KEY;
            api_secret = process.env.ROARK_ANTAVO_SECRET;
            api_url = process.env.ROARK_ANTAVO_URL;
            api_region = process.env.ROARK_ANTAVO_REGION;
          }
          if(customer.store_name == 'dev-roark.myshopify.com') {
              api_key = process.env.ROARK_ANTAVO_KEY_DEV;
              api_secret = process.env.ROARK_ANTAVO_SECRET_DEV;
              api_url = process.env.ROARK_ANTAVO_URL_DEV;
              api_region = process.env.ROARK_ANTAVO_REGION_DEV;
          }
          return { 
            key: api_key, 
            secret: api_secret,
            url: api_url,
            region: api_region
          }; 
        } catch (err) {
          // console.log((err)
          res.status(500).send('failed to authenticate antavo')
        }
  },
  exponea_authenticate: function (req, res, next) {
      try {
          const customer = req.body;
          let exponea_token;
          let exponea_auth;
          if(customer.store_name == 'olukai-store-dev.myshopify.com') {
            exponea_token = process.env.OLUKAI_EXPONEA_TOKEN_DEV
            exponea_auth = process.env.OLUKAI_EXPONEA_KEY_DEV +':'+ process.env.OLUKAI_EXPONEA_SECRET_DEV
          }
          if(customer.store_name == 'olukai.com') {
            exponea_token = process.env.OLUKAI_EXPONEA_TOKEN
            exponea_auth = process.env.OLUKAI_EXPONEA_KEY +':'+ process.env.OLUKAI_EXPONEA_SECRET
          }
          if(customer.store_name == 'olukai.ca') {
            exponea_token = process.env.OLUKAI_EXPONEA_TOKEN_CA
            exponea_auth = process.env.OLUKAI_EXPONEA_KEY_CA +':'+ process.env.OLUKAI_EXPONEA_SECRET_CA
          }
          if(customer.store_name == 'dev-roark.myshopify.com') {
            exponea_token = process.env.ROARK_EXPONEA_TOKEN_DEV
            exponea_auth = process.env.ROARK_EXPONEA_KEY_DEV +':'+ process.env.ROARK_EXPONEA_SECRET_DEV
          }
          if(customer.store_name == 'roark.com') {
            exponea_token = process.env.ROARK_EXPONEA_TOKEN
            exponea_auth = process.env.ROARK_EXPONEA_KEY +':'+ process.env.ROARK_EXPONEA_SECRET
          }
          // return exponea_token,exponea_auth;
          return { 
            token: exponea_token, 
            auth: exponea_auth 
          }; 

        } catch (err) {
          // console.log((err)
          res.status(500).send('failed to authenticate exponea')
        }
  },
  shopify_authenticate: function (req, res, next) {
    try {
        const customer = req.body;
        let shopify_token;
        let shopify_auth;
        let shopify_url;
        let shopify_rest;
        if(customer.store_name == 'olukai-store-dev.myshopify.com') {
          shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN_DEV
          shopify_auth = process.env.OLUKAI_SHOPIFY_KEY_DEV +':'+ process.env.OLUKAI_SHOPIFY_SECRET_DEV
          shopify_url = process.env.OLUKAI_SHOPIFY_URL_DEV
          shopify_rest = process.env.OLUKAI_SHOPIFY_REST_DEV
        }
        if(customer.store_name == 'olukai.com') {
          shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN
          shopify_auth = process.env.OLUKAI_SHOPIFY_KEY +':'+ process.env.OLUKAI_SHOPIFY_SECRET
          shopify_url = process.env.OLUKAI_SHOPIFY_URL
          shopify_rest = process.env.OLUKAI_SHOPIFY_REST
        }
        if(customer.store_name == 'vip.olukai.com') {
          shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN_VIP
          shopify_auth = process.env.OLUKAI_SHOPIFY_KEY_VIP +':'+ process.env.OLUKAI_SHOPIFY_SECRET_VIP
          shopify_url = process.env.OLUKAI_SHOPIFY_URL_VIP
          shopify_rest = process.env.OLUKAI_SHOPIFY_REST_VIP
        }
        if(customer.store_name == 'olukai.ca') {
          // console.log(('its in canada')
          shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN_CA
          shopify_auth = process.env.OLUKAI_SHOPIFY_KEY_CA +':'+ process.env.OLUKAI_SHOPIFY_SECRET_CA
          shopify_url = process.env.OLUKAI_SHOPIFY_URL_CA
          shopify_rest = process.env.OLUKAI_SHOPIFY_REST_CA
        }
        if(customer.store_name == 'vip.roark.com') {
          shopify_token = process.env.ROARK_SHOPIFY_TOKEN_VIP
          shopify_auth = process.env.ROARK_SHOPIFY_KEY_VIP +':'+ process.env.ROARK_SHOPIFY_SECRET_VIP
          shopify_url = process.env.ROARK_SHOPIFY_URL_VIP
          shopify_rest = process.env.ROARK_SHOPIFY_REST_VIP
        }
        if(customer.store_name == 'dev-roark.myshopify.com') {
          shopify_token = process.env.ROARK_SHOPIFY_TOKEN_DEV
          shopify_auth = process.env.ROARK_SHOPIFY_KEY_DEV +':'+ process.env.ROARK_SHOPIFY_SECRET_DEV
          shopify_url = process.env.ROARK_SHOPIFY_URL_DEV
          shopify_rest = process.env.ROARK_SHOPIFY_REST_DEV
        }
        if(customer.store_name == 'roark.com') {
          shopify_token = process.env.ROARK_SHOPIFY_TOKEN
          shopify_auth = process.env.ROARK_SHOPIFY_KEY +':'+ process.env.ROARK_SHOPIFY_SECRET
          shopify_url = process.env.ROARK_SHOPIFY_URL
          shopify_rest = process.env.ROARK_SHOPIFY_REST
        }
        // return exponea_token,exponea_auth;
        return { 
          token: shopify_token, 
          auth: shopify_auth,
          url: shopify_url,
          rest: shopify_rest
        }; 

      } catch (err) {
        // console.log((err)
        res.status(500).send('failed to authenticate shopify')
      }
}
}
