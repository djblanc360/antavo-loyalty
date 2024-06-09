/* global api_key, api_secret, api_url */
const crypto = require('crypto')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    getProfile: async function (customer, res) {
    },
    postProfile: async function (customer, res) {
        try {

            const method = 'POST';
            const service = 'api';
            const region = 'st2';
            const host = `${service}.${region}.antavo.com`;
            const canonicalUri = '/events';
            const canonicalQuerystring = '';
            const endpoint = `https://${host}${canonicalUri}${canonicalQuerystring}`;
            
            const contentType = 'application/json';
            var requestParameters = {
              'customer': customer.email,
              'action': 'profile',
              'data': {},
            };

            // for each object in customer, add to requestParameters.data

            // CUSTOM PAYLOAD PROPERTIES
            for (const [key, value] of Object.entries(customer)) {
                console.log(`attr - ${key}: ${value}`);
                requestParameters.data[key] = value;
            }

            requestParameters = JSON.stringify(requestParameters);
              
            // END CUSTOM PAYLOAD PROPERTIES

            // if(customer.instagram_username !== undefined) {
            //     requestParameters.data.instagram_username = customer.instagram_username
            // }
            // if(customer.facebook_id !== undefined) {
            //     requestParameters.data.facebook_id = customer.facebook_id
            // }
            // requestParameters = JSON.stringify(requestParameters);
            

            
            // IF PHONE IS NOT PART OF PAYLOAD 
            // if(customer.instagram_username !== undefined) {
            //     requestParameters.data.instagram_username = customer.instagram_username
            // }

            console.log(customer.email,'- in account/profile-signed.js POST requestParameters: ',requestParameters)

            // Create a date for headers and the credential string
            const t = new Date();
            const date = t.toISOString().replace(/[:\-]|\.\d{3}/g, '');
            const dateStamp = date.slice(0, 8);

            const accessKey = api_key; //'AN1O84EJTAAHEAVOBU5';
            const secretKey = api_secret; //'ZfCi9Q5bIejyyA/Ih/dsxHP0+gS';

            function sign(key, msg) {
            return crypto.createHmac('sha256', key).update(msg).digest();
            }

            function getSignatureKey(key, dateStamp, regionName, serviceName) {
            const kDate = sign(`ANTAVO${key}`, dateStamp);
            const kRegion = sign(kDate, regionName);
            const kService = sign(kRegion, serviceName);
            const kSigning = sign(kService, 'antavo_request');
            return kSigning;
            }

            const canonicalHeaders = `date:${date}\nhost:${host}\n`;
            const signedHeaders = 'date;host';

            const payloadHash = crypto
            .createHash('sha256')
            .update(requestParameters)
            .digest('hex');
            const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

            const algorithm = 'ANTAVO-HMAC-SHA256';
            const credentialScope = `${dateStamp}/${region}/${service}/antavo_request`;
            const stringToSign = `${algorithm}\n${date}\n${credentialScope}\n${crypto
            .createHash('sha256')
            .update(canonicalRequest)
            .digest('hex')}`;

            const signingKey = getSignatureKey(secretKey, dateStamp, region, service);

            const signature = crypto
            .createHmac('sha256', signingKey)
            .update(stringToSign)
            .digest('hex');

            const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

            const headers = {
            'Content-Type': contentType,
            date: date,
            Authorization: authorizationHeader,
            };



            console.log(customer.email,'- in account/profile-signed.js POST authorizationHeader: ',authorizationHeader)
            console.log(customer.email,'- in account/profile-signed.js POST headers: ',headers)
            
            console.log(requestParameters);
            console.log(customer.email,'- in account/profile-signed.js POST endpoint: ',endpoint)
            console.log(customer.email,'- in account/profile-signed.js POST requestParameters: ',requestParameters)

            
            const response = await fetch(endpoint, {
                method: method,
                body: requestParameters,
                headers: headers,
              })

            const data = await response.json()
            console.log(customer.email,'- in account/profile-signed.js POST success: ',data)
      
            return data
      
        } catch (err) {
            console.log(customer.email,' -Something went wrong in retrieve profile-signed.js POST',err)
            res.status(500).send('Something went wrong in retrieve profile-signed.js')
        }
    }
}
