/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    shopify_follow: async function (data, res) {
        try {
            // console.log(data.email,'- in shopify_follow',data);
            

            const body = {
                "customer":data.email,
                "action": "shopify_follow",
                "data": {
                    "network":data.network,
                    "give_away_entries":data.give_away_entries
                }
            }

            console.log(data.email,'- shopify_follow: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: shopify_follow ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in shopify_follow',err)
            res.status(500).send('Something went wrong in shopify_follow')
          }
    }
}



