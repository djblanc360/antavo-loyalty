/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    createCustomer: async function (customer, res) {
        try {
            console.log(customer.email,'- in backup create customer',customer);
        
            // "birth_date":customer.birth_date
            var body;
        if(customer.shopify_id !== undefined) {
            body = {
                    "customer":customer.email,
                    "action": "opt_in",
                    "data": {
                        "email":customer.email,
                        "first_name":customer.first_name,
                        "last_name":customer.last_name,
                        "domain":customer.store_name,
                        "src":customer.source,
                        "terms_and_conditions": "Yes",
                        "privacy_policy": "Yes",
                        "email_communication": "Yes",
                        "shopify_id":customer.shopify_id,
                        "tags":customer.tags
                    }
                }
        } else {
            body = {
                "customer":customer.email,
                "action": "opt_in",
                "data": {
                    "email":customer.email,
                    "first_name":customer.first_name,
                    "last_name":customer.last_name,
                    "domain":customer.store_name,
                    "src":customer.source,
                    "terms_and_conditions": "Yes",
                    "privacy_policy": "Yes",
                    "email_communication": "Yes",
                }
            }
        }
            // const body = {
            //     "customer":customer.email,
            //     "action": "opt_in",
            //     "data": {
            //         "email":customer.email,
            //         "first_name":customer.first_name,
            //         "last_name":customer.last_name,
            //         "domain":customer.store_name,
            //         "src":customer.source,
            //         "terms_and_conditions": "Yes",
            //         "privacy_policy": "Yes",
            //         "email_communication": "Yes",
            //         "shopify_id":customer.shopify_id,
            //         "tags":customer.tags
            //     }
            // }

            // "shopify_id":customer.shopify_id,
            // "tags":customer.tags

            console.log(customer.email,'- in backup create customer: body is ',body);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let createCustomerData = await response.json();
            console.log(customer.email,'- backup createCustomerData: ', createCustomerData);

            return createCustomerData;

          } catch (err) {
            console.log(customer.email,'- Something went wrong in customer/backup-create.js',err)
            res.status(500).send('Something went wrong in customer/backup-create.js')
          }
    }
}



