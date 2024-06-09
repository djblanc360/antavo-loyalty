/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    shopify_connect: async function (data, res) {
        try {
            // console.log(data.email,'- in shopify_connect',data);
            

            const body = {
                "customer":data.email,
                "action": "shopify_connect",
                "data": {
                    "network":data.network,
                    "give_away_entries":data.give_away_entries
                }
            }

            console.log(data.email,'- shopify_connect: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: shopify_connect ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in shopify_connect',err)
            res.status(500).send('Something went wrong in shopify_connect')
          }
    }
}



