/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    shopify_refund: async function (data, res) {
        try {
            console.log(data.email,'- in shopify_refund',customer);
            

            const body = {
                "customer":data.email,
                "action": "shopify_refund",
                "data": {
                    "transaction_id":data.transaction_id,
                    "items":data.items
                }
            }

            console.log(data.email,'- shopify_refund: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: shopify_refund ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in shopify_refund',err)
            res.status(500).send('Something went wrong in shopify_refund')
          }
    }
}



