/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    opt_in: async function (data, res) {
        try {
            console.log('opt in',data);
        
            var body = {
                "customer":data.email,
                "action": "opt_in",
                "data": {
                    "email":data.email,
                    "domain":data.store_name,
                    "terms_and_conditions": "Yes",
                    "privacy_policy": "Yes",
                    "email_communication": "Yes"
                }
            }
            if(data.first_name !== undefined) {
                body.data.first_name = data.first_name
            }
            if(data.last_name !== undefined) {
                body.data.last_name = data.last_name;
            }
            if(data.source !== undefined) {
                body.data.src = data.source;
            }
            if(data.shopify_id !== undefined) {
                
                let site = data.store_name;
                let name = (site.split("."))[0];
                
                if(data.store_name == 'olukai.ca') {
                    name = "olukaica"
                }
                const shopifyid = {
                    [name]:data.shopify_id
                }
                body.data.shopify_id = shopifyid;
                
            }
            if(data.tags !== undefined) {
                body.data.tags= data.tags;
            }

            console.log('body is ',body);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();
            console.log('payload');
            console.log(payload);

            return payload;

          } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong')
          }
    }
}



