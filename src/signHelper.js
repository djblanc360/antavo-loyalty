/* global api_key, api_secret, api_url, api_region */

const crypto = require('crypto')
const https = require('https')
const querystring = require('querystring') // upgrade to URLearchParams API https://www.geeksforgeeks.org/node-js-urlsearchparams-api/

const accessKey = api_key
const secretKey = api_secret
const region = api_region
const serviceName = 'api'

module.exports = {
    authHeader: function (customer, method, path, queryParams, payload) {
        console.log(customer.email,'- in signHelper.js : ', queryParams, payload)

        console.log(customer.email,'- in retrieve profile-signed: region ',region);
        // current date and time in UTC
        // const now = new Date().toISOString().replace(/[:-]/g, '')
        const now = new Date().toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z'

        // signed headers for request
        const signedHeaders = 'content-type;date;host'

        queryParams = queryParams !== undefined ? querystring.stringify(queryParams) : ''
        payload = payload !== undefined ? querystring.stringify(payload) : ''

        // Canonical Request
        const canonicalRequest = [
            method,
            path,
            queryParams,
            'content-type:application/json',
            'date:' + now,
            'host:api.st2.antavo.com',
            payload,
            signedHeaders,
            crypto.createHash('sha256').update('').digest('hex')
        ].join('\n')
            
        console.log(customer.email,'- in customer/profile-signed.js canonicalRequest: ', canonicalRequest)

        
        // String to Sign
        const stringToSign = [
            'ANTAVO-HMAC-SHA256',
            now,
            [
                now.substr(0, 8), // RequestDateTime
                region,
                serviceName,
                'antavo_request'
            ].join('/'),
            crypto.createHash('sha256').update(canonicalRequest).digest('hex')
        ].join('\n')

        console.log(customer.email,'- in customer/profile-signed.js stringToSign: ', stringToSign)
        
        const dateKey = crypto.createHmac('sha256', secretKey).update('ANTAVO' + secretKey).digest()
        const regionKey = crypto.createHmac('sha256', dateKey).update(region).digest()
        const serviceKey = crypto.createHmac('sha256', regionKey).update(serviceName).digest()
        const signingKey = crypto.createHmac('sha256', serviceKey).update('antavo_request').digest()
        
        // signature
        const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex')
        
        // authorization header
        const authHeader = [
            'ANTAVO-HMAC-SHA256 Credential=' + accessKey + '/' + now.substr(0, 8) + '/' + region + '/' + serviceName + '/antavo_request',
            'SignedHeaders=' + signedHeaders,
            'Signature=' + signature
        ].join(', ')

        console.log(customer.email,'- in customer/profile-signed.js authHeader: ', authHeader)

        return authHeader
    }
  }