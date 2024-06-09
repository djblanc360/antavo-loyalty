/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    refund_item: async function (data, res) {
        try {
            console.log(data.email,'- in refund_item',customer);
            

            const body = {
                "customer":data.email,
                "action": "refund_item",
                "data": {
                    "transaction_id":data.transaction_id,
                    "product_id":data.product_id,
                    "quantity":data.quantity,
                    "subtotal":data.subtotal,
                    "give_away_entries":data.give_away_entries,
                    "current_tier_status":data.current_tier_status,
                    "tier_status_at_checkout":data.tier_status_at_checkout
                }
            }

            console.log(data.email,'- refund_item: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: refund_item ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in refund_item',err)
            res.status(500).send('Something went wrong in refund_item')
          }
    }
}



