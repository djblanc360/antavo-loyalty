const serverless = require("serverless-http");
const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const customerRoutes = require('./customer/route');

/** general account-related events  */
const accountRoutes = require('./account/route');
const reviewRoutes = require('./review/route');
const activitiesRoutes = require('./activities/route');

/** bloomreach  */
const exponeaRoutes = require('./exponea/route');
/** bloomreach  */
const shopifyRoutes = require('./shopify/route');

/** webhooks  */

/** get store-specific API credentials  */
/** antavo  */
app.use(function (req, res, next) {
    const credentials = require('./credentials.js');
    let antavo = credentials.authenticate(req, res, next);
    
    const key = antavo.key;
    const secret = antavo.secret;
    const url = antavo.url;
    const region = antavo.region;
    console.log('key: ' + key);
    console.log('url: ' + url)
    // app.locals.api_key = key;
    global.api_key = key;
    global.api_secret = secret;
    global.api_url = url;
    global.api_region = region;
    next();
});
/** exponea  */
app.use(function (req, res, next) {
    const credentials = require('./credentials.js');
    let exponea = credentials.exponea_authenticate(req, res, next);
    
    const exponea_token = exponea.token;
    const exponea_auth = exponea.auth;
    // app.locals.api_key = key;
    global.exponea_token = exponea_token;
    global.exponea_auth = exponea_auth;
    next();
});
/** shopify  */
app.use(function (req, res, next) {
    const credentials = require('./credentials.js');
    let shopify = credentials.shopify_authenticate(req, res, next);
    // console.log('shopify: ' + shopify);
    const shopify_token = shopify.token;
    const shopify_auth = shopify.auth;
    const shopify_url = shopify.url;
    const shopify_rest = shopify.rest;
    // console.log('shopify_token: ' + shopify_token);
    // console.log('shopify_auth: ' + shopify_auth);
    // console.log('shopify_url: ' + shopify_url);
    // console.log('shopify_rest: ' + shopify_rest);
    // app.locals.api_key = key;
    global.shopify_token = shopify_token;
    global.shopify_auth = shopify_auth;
    global.shopify_url = shopify_url;
    global.shopify_rest = shopify_rest;
    next();
});

app.use('/customer', customerRoutes); // use routes for any requests that match this url structure
app.use('/account', accountRoutes);
app.use('/review', reviewRoutes);
app.use('/activities', activitiesRoutes);

app.use('/exponea', exponeaRoutes);
app.use('/shopify', shopifyRoutes);

module.exports = app;