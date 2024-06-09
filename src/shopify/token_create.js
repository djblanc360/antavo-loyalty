/* global shopify_token, shopify_auth, shopify_url, shopify_rest */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    createCustomer: async function (customer, res) {

        console.log('inside shopify/create.js')
        if(customer.password !== undefined) {
            console.log('customer created password')

            try {
                const body = {
                    "customer": {
                        "accepts_marketing": true,
                        "marketing_opt_in_level": "SINGLE_OPT_IN",
                        "first_name": customer.first_name,
                        "last_name": customer.last_name,
                        "email": customer.email,
                        "phone": customer.phone,
                        "verified_email": true,
                        "tags": [
                            "Subscribed",
                            "loyalty_member"
                        ],
                        "password": customer.password,
                        "password_confirmation": customer.password,
                        "send_email_welcome": false,
                        "state": "ENABLED"
                    }
                }
                console.log(body)

                // const auth = new Buffer(shopify_auth).toString('base64')
                // headers: {
                //     'Content-type': 'application/json',
                //     'Authorization': 'Basic '+ auth
                // }
                const response = await fetch(shopify_rest+'/customers.json', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-type': 'application/json',
                        'X-Shopify-Access-Token': shopify_token
                    }
                })
                let customerData = await response.json()
                console.log('customerData in shopify/create.js', customerData)

                if(customerData.customer !== undefined) {
                    console.log(customerData.customer)
                    return customerData.customer
                } else {
                    return null
                }
        
                
            } catch (err) {
                console.log('err ',err)
                res.status(500).send('token_create failed at password')
            }
        
        } else {
            console.log('customer without a  password')
            try {
                const body = {
                    query: `mutation customerCreate($input: CustomerInput!) {
                        customerCreate(input: $input) {
                            customer {
                                id
                                    email
                                    phone
                                    firstName
                                    lastName
                                    note
                                    acceptsMarketing
                                    tags
                                    marketingOptInLevel
                            }
                            userErrors {
                                field
                                    message
                            }
                        }
                    }`,
                    variables: {
                        "input":{
                            "acceptsMarketing":true,
                                "email":customer.email,
                                "marketingOptInLevel":"SINGLE_OPT_IN",
                                "firstName":customer.first_name,
                                "lastName":customer.last_name,
                                "note":"phonenumber: " + customer.note, //"phonenumber: (562) 884-2097"
                                "phone":customer.phone, //"+15628842097"
                                "tags":["Subscribed","loyalty_member"]
                        }
                    }
                }
                    console.log(body)

                // const auth = new Buffer(shopify_auth).toString('base64')
                // headers: {
                //     'Content-type': 'application/json',
                //     'X-Shopify-Access-Token': shopify_token
                // } 
                const response = await fetch(shopify_url, {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-type': 'application/json',
                        'X-Shopify-Access-Token': shopify_token
                    }
                })
                    let customerData = await response.json()
                    console.log('customerData in shopify/create.js ',customerData)
        
                
                if(customerData.data.customerCreate.customer !== undefined) {
                    console.log(customerData.data.customerCreate.customer)
                    return customerData.data.customerCreate.customer
                } else {
                    return null
                }

            } catch (err) {
                console.log('err ',err)
                res.status(500).send('token_create failed at no password')
            }
        }

          
          
    }
}



