/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    getActivities: async function (customer, res) {
        try {

            console.log(customer.email,'- in retrieve activities: body is ',customer)
            // The API endpoint URL
            const endpoint = 'https://api.st2.antavo.com/customers'

            const method = 'GET'
            // canonical URI parameter
            const path = `/customers/${encodeURIComponent(customer.email)}/activities`
            console.log(customer.email,'- in customer/activities.js path: ',path)

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
            console.log(customer.email,'- in customer/activities.js requestOptions: ',requestOptions)
            
            const url = `${api_url}${path}?api_key=${api_key}`
            console.log(customer.email,'- in customer/activities.js url: ',url)
            
            const response = await fetch(url, requestOptions)

            const data = await response.json()
            console.log(customer.email,'- in customer/activities.js success: ',data)
      
            return data
      
        } catch (err) {
            console.log(customer.email,' -Something went wrong in retrieve activities',err)
            res.status(500).send('Something went wrong in retrieve activities')
        }
    }
}
