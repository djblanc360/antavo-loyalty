/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    refund: async function (data, res) {
        try {
            console.log(data.email,'- in refund',customer);
            

            const body = {
                "customer":data.email,
                "action": "refund",
                "data": {
                    "transaction_id":data.transaction_id,
                    "give_away_entries":data.give_away_entries,
                    "current_tier_status":data.current_tier_status,
                    "tier_status_at_checkout":data.tier_status_at_checkout
                }
            }

            console.log(data.email,'- refund: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: refund ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in refund',err)
            res.status(500).send('Something went wrong in refund')
          }
    }
}



