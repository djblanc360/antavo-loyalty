/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    customerAttributes: async function (customer, res) {
        try {
            console.log(customer.email,'- in customer attributes');
            // "birth_date":customer.birth_date
        
            const body = {
                "customer_ids": {
                    "email_id": customer.email,
                },
                "attributes": [
                    {
                        "type": "property",
                        "property": "first_name"
                    },
                    {
                        "type": "property",
                        "property": "last_name"
                    },
                    {
                            "type": "id",
                            "id": "registered"
                    },
                    {
                        "type": "consent",
                        "category": "back-in-stock",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "cart-notifications",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "news-and-offers",
                        "mode": "timestamp"
                    },
                    {
                        "type": "consent",
                        "category": "sms-cart-notifications",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "sms-launches",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "sms-stock-notifications",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "sms-surveys",
                        "mode": "until"
                    },
                    {
                        "type": "consent",
                        "category": "surveys",
                        "mode": "until"
                    },
                    {
                        "type": "consent",
                        "category": "text-join",
                        "mode": "until"
                    }   
                ]
            }
            console.log(customer.email,'- in customer attributes: body is ',body)
            // console.log('body');
            // console.log(body);
            // const buf = new Buffer(exponea_auth);
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64');

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            });
            let customerAttributesData = await response.json();
            console.log(customer.email,'- customerAttributesData',customerAttributesData);

            return customerAttributesData;

          } catch (err) {
            console.log(customer.email,'- Something went wrong in exponea/attributes',err)
            res.status(500).send('Something went wrong in exponea/attributes')
          }
          
          
    }
}



