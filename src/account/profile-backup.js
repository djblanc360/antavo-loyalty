/* global api_key, api_secret, api_url */
const crypto = require('crypto')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    getProfile: async function (customer, res) {
        try {

            console.log(customer.email,'- in retrieve profile: body is ',customer)
            // The API endpoint URL
            const endpoint = 'https://api.st2.antavo.com/events'

            const method = 'GET'
            // canonical URI parameter
            const path = `/events/${encodeURIComponent(customer.email)}`
            console.log(customer.email,'- in account/profile.js path: ',path)

            // authorization header
            const signed = require('../signHelper.js')
            const authHeader = signed.authHeader(customer, method, path)
        
            // final HTTP request options object
            const requestOptions = {
                method: method,
                headers: {
                    Authorization: authHeader
                }
            }
            console.log(customer.email,'- in account/profile.js requestOptions: ',requestOptions)
            
            const url = `${api_url}${path}?api_key=${api_key}`
            console.log(customer.email,'- in account/profile.js url: ',url)
            
            const response = await fetch(url, requestOptions)

            const data = await response.json()
            console.log(customer.email,'- in account/profile.js success: ',data)
      
            return data
      
        } catch (err) {
            console.log(customer.email,' -Something went wrong in retrieve profile',err)
            res.status(500).send('Something went wrong in retrieve profile')
        }
    },
    postProfile: async function (customer, res) {
        try {

            console.log(customer.email,'- in retrieve profile: body is ',customer)
            // The API endpoint URL
            const endpoint = 'https://api.st2.antavo.com/events'

            // The payload for POST request
            var payload = {
                "customer":customer.email,
                "action": "profile",
                "data": {
                    'instagram_username': customer.instagram_username
                }
            }
            // "data": {
            //     'instagram_username': 'darylsubmit2'
            // } 

            // IF PHONE IS NOT PART OF PAYLOAD 
            // if(customer.instagram_username !== undefined) {
            //     payload.data.instagram_username = customer.instagram_username
            // }

            const method = 'POST'
            // canonical URI parameter
            const path = `/events`
            console.log(customer.email,'- in account/profile.js POST path: ',path)

            // authorization header
            const signed = require('../signHelper.js')
            const testQueryParams = 'test=testvalue'
            const authHeader = signed.authHeader(customer, method, path, testQueryParams, payload)
        
            // final HTTP request options object
            const requestOptions = {
                method: method,
                headers: {
                    Authorization: authHeader
                }
            }
            console.log(customer.email,'- in account/profile.js POST requestOptions: ',requestOptions)
            
            const url = `${api_url}${path}?api_key=${api_key}`
            console.log(customer.email,'- in account/profile.js POST url: ',url)
            
            const response = await fetch(url, requestOptions)

            const data = await response.json()
            console.log(customer.email,'- in account/profile.js POST success: ',data)
      
            return data
      
        } catch (err) {
            console.log(customer.email,' -Something went wrong in retrieve profile POST',err)
            res.status(500).send('Something went wrong in retrieve profile')
        }
    },
    testProfile: async function (customer, res) {
        try {
            const API_KEY = 'AN1O84EJTAAHEAVOBU5';
            const API_SECRET = 'ZfCi9Q5bIejyyA/Ih/dsxHP0+gS';
            const REGION = 'st2';
            const API_BASE = `https://api.${REGION}.antavo.com`;
            const API_ENDPOINT = '/events';
            
            const payload = {
                'customer': customer.email,
                'action': 'profile',
                'data': {
                    'first_name': 'Daryl',
                    'last_name': 'Submit',
                    'properties': {
                        'instagram_username': 'darylsubmit',
                    }
                },
            };
            
            const payloadString = JSON.stringify(payload);
            
            // date to format 'YYYYMMDD'
            const date = new Date().toISOString().substring(0, 10).replace(/-/g, '');
            
            // Prepare the signature
            const preHash = `POST${API_ENDPOINT}`;
            const hmac = crypto.createHmac('sha256', `${API_SECRET}${date}`);
            hmac.update(preHash);
            const signature = hmac.digest('hex');
            
            const headers = {
                'Content-Type': 'application/json',
                'Date': new Date().toUTCString(),
                'Authorization': `ANTAVO-HMAC-SHA256 Credential=${API_KEY}/${date}/${REGION }/api/antavo_request,SignedHeaders=date;host,Signature=${signature}`,
            };

            const requestOptions = {
                method: 'POST',
                body: payloadString,
                headers: headers,
            }

            console.log(customer.email,'- in account/profile.js TEST API_BASE + API_ENDPOINT: ',API_BASE + API_ENDPOINT)
            console.log(customer.email,'- in account/profile.js TEST requestOptions: ',requestOptions)
            
            const url = `${API_BASE}${API_ENDPOINT}`
            console.log(customer.email,'- in account/profile.js TEST url: ',url)
            // Send the POST request
            // fetch(API_BASE + API_ENDPOINT, requestOptions)
            //   .then((response) => response.json())
            //   .then((json) => {console.log(json)})
            //   .catch((error) => console.error('Error:', error));
            const response = await fetch(url, requestOptions)

            const data = await response.json()
            console.log(customer.email,'- in account/profile.js TEST success: ',data)
    
            return data
        } catch (err) {
            console.log(customer.email,' -Something went wrong in retrieve profile',err)
            res.status(500).send('Something went wrong in retrieve profile')
        }

    },
    sendProfileData: async function (customer, res) {
        const API_KEY = 'AN1O84EJTAAHEAVOBU5';
        const API_SECRET = 'ZfCi9Q5bIejyyA/Ih/dsxHP0+gS';
        const REGION = 'st2';
        const API_BASE = `https://api.${REGION}.antavo.com`;
        const API_ENDPOINT = '/events';

        // Prepare the data payload
        const data = {
            customer: customer.email,
            action: 'profile',
            data: {
            first_name: 'Daryl',
            last_name: 'Testing',
            },
        };
        console.log(customer.email,' - data',data)

        // Convert the data payload to a string
        const dataString = JSON.stringify(data);

        // Create a date string in the format 'YYYYMMDD'
        const date = new Date().toISOString().substring(0, 10).replace(/-/g, '');

        // Prepare the signature
        const preHash = `POST${API_ENDPOINT}`;
        const hmac = crypto.createHmac('sha256', `${API_SECRET}${date}`);
        hmac.update(preHash);
        const signature = hmac.digest('hex');

        // Prepare headers
        const headers = {
            'Content-Type': 'application/json',
            'Date': new Date().toUTCString(),
            'Authorization': `ANTAVO-HMAC-SHA256 Credential=${API_KEY}/${date}/test/api/antavo_request,SignedHeaders=date;host,Signature=${signature}`,
        };
        console.log(customer.email,'- in account/profile.js TEST headers: ',headers)
        console.log(customer.email,'- in account/profile.js TEST dataString: ',dataString)
        // Send the POST request
        try {
            const response = await fetch(API_BASE + API_ENDPOINT, {
            method: 'POST',
            body: dataString,
            headers: headers,
            });

            if (response.ok) {
            const json = await response.json();
            console.log(customer.email,'- in account/profile.js TEST success: ',json)
            return json
            } else {
            throw new Error(`Request failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            return {
            status: error.response ? error.response.status : 500,
            json: {
                error: error.message,
            },
            };
        }
    },
    updateProfile: async function (customer, res) {
        try {
            console.log(customer.email,'- in create customer',customer);
 
            var body = {
                "customer":customer.email,
                "action": "profile",
                "data": {}
            }
            if(customer.instagram_username!== undefined) {
                body.data.instagram_username = customer.instagram_username
            }

            // "shopify_id":customer.shopify_id,
            // "tags":customer.tags

            console.log(customer.email,'- in create customer: body is ',body);
            // const response = await fetch(api_url+'/events?api_key='+api_key, {
            const response = await fetch('https://api.st2.antavo.com/events?api_key=AN1O84EJTAAHEAVOBU5', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let createCustomerData = await response.json();
            console.log(customer.email,'- in customer/create.js success: ', createCustomerData);

            if (createCustomerData.hasOwnProperty('error')) {
                let error = `${createCustomerData.error.message}`
                return res.status(403).json({status: 403, message: error})
            } else {
                return createCustomerData
            }


          } catch (err) {
            console.log(customer.email,'- Something went wrong in customer/create.js',err)
            res.status(500).send('Something went wrong in customer/create.js')
          }
    }
}