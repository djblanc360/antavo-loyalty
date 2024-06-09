/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    getProfile: async function (customer, res) {
        try {
            console.log(customer.email,'- in retrieve profile: body is ',customer);
        
            // const response = await fetch('https://api.st2.antavo.com/customers/'+customer.email+'?api_key='+api_key);
            // handle special characters, like "+", in email
            const url = `${api_url}/customers/${encodeURIComponent(customer.email)}?api_key=${api_key}`;
            const response = await fetch(url);
            let getProfileData = await response.json();
            console.log(customer.email,'- in customer/profile.js success: ',getProfileData);
    
            return getProfileData;

          } catch (err) {
            console.log(customer.email,'- Something went wrong in profile.js',err)
            res.status(500).send('Something went wrong in profile.js')
          }
    }
}



