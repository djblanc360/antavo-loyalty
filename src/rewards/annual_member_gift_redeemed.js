/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    annual_member_gift_redeemed: async function (data, res) {
        try {
            console.log(data.email,'- in annual_member_gift_redeemed',customer);
            

            const body = {
                "customer":data.email,
                "action": "annual_member_gift_redeemed",
                "data": {
                    "transaction_id":data.transaction_id,
                    "product_id":data.product_id
                }
            }

            console.log(data.email,'- annual_member_gift_redeemed: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: annual_member_gift_redeemed ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in annual_member_gift_redeemed',err)
            res.status(500).send('Something went wrong in annual_member_gift_redeemed')
          }
    }
}



