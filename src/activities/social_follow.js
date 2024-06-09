/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    getSocialFollow: async function (customer, res) {
        try {

            console.log(customer.email,'- in retrieve social_follow: body is ',customer)
            // The API endpoint URL
            const endpoint = 'https://api.st2.antavo.com/customers'

            const method = 'GET'
            // canonical URI parameter
            // const path = `/customers/${encodeURIComponent(customer.email)}/activities/social_follow`
            const path = `/customers/${encodeURIComponent(customer.email)}/activities`
            console.log(customer.email,'- in activities/social_follow.js path: ',path)

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
            console.log(customer.email,'- in activities/social_follow.js requestOptions: ',requestOptions)
            
            const url = `${api_url}${path}?api_key=${api_key}`
            console.log(customer.email,'- in activities/social_follow.js url: ',url)
            
            const response = await fetch(url, requestOptions)

            const data = await response.json()
            console.log(customer.email,'- in activities/social_follow.js success: ',data)

            const activities = data.data

            // filter out the activities that are not of type "social_follow"
            const filtered = activities.filter(activity => activity.activity_type === "social_follow")

            console.log(customer.email,'- in activities/social_follow.js filtered: ', filtered)
      
            let social = filtered.length > 0 ? filtered : null

            console.log(customer.email,'- in activities/social_follow.js social: ', social)

            return social
      
        } catch (err) {
            console.log(customer.email,' -Something went wrong in retrieve social_follow',err)
            res.status(500).send('Something went wrong in retrieve social_follow')
        }
    }
}
