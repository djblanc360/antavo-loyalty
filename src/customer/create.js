/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    createCustomer: async function (customer, res) {
        try {
            console.log(customer.email,'- in create customer',customer);
 
            var body = {
                "customer":customer.email,
                "action": "opt_in",
                "data": {
                    "email":customer.email,
                    "domain":customer.store_name,
                    "terms_and_conditions": "Yes",
                    "privacy_policy": "Yes",
                    "email_communication": "Yes"
                }
            }
            if(customer.first_name !== undefined) {
                body.data.first_name = customer.first_name
            }
            if(customer.last_name !== undefined) {
                body.data.last_name = customer.last_name;
            }
            if(customer.source !== undefined) {
                body.data.src = customer.source;
            }
            if(customer.shopify_id !== undefined) {

                
                let site = customer.store_name;
                let name = (site.split("."))[0];

                if(customer.store_name == 'olukai.ca') {
                    name = "olukaica"
                }
                
                const shopifyid = {
                    [name]:customer.shopify_id
                }
                // Object.assign(shopifyid, {name: customer.shopify_id})

                body.data.shopify_id = shopifyid;
                
                // body.data.shopify_id = customer.shopify_id;
            }
            if(customer.tags !== undefined) {
                body.data.tags= customer.tags;
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



