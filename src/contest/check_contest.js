/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    opt_out: async function (data, res) {
        try {
            console.log(data.email,'- in check_contest',customer);
            

            const body = {
                "customer":data.email,
                "action": "check_contest",
                "data": {
                    "transaction_id":data.transaction_id,
                    "total":data.total,
                    "items":data.items,
                    "points_burned":data.points_burned,
                    "channel":data.channel,
                    "currency":data.currency,
                    "country":data.country,
                    "discount":data.discount,
                    "shipping":data.shipping,
                    "purchase_date":data.purchase_date,
                    "coupon":data.coupon,
                    "original_transaction_id":data.original_transaction_id,
                    "order_tags":data.order_tags,
                    "shop":data.shop,
                    "points_rewarded":data.points_rewarded,
                    "total_quantity":data.total_quantity,
                    "coupon_code":data.coupon_code,
                    "coupons":data.coupons,
                    "store":data.store,
                    "give_back_day_flag":data.give_back_day_flag,
                    "give_back_day_flag_attribute":data.give_back_day_flag_attribute,
                    "give_away_entries":data.give_away_entries,
                    "current_tier_status":data.current_tier_status,
                    "ohana_campaign":data.ohana_campaign,
                    "ohana_bonus_points":data.ohana_bonus_points
                }
            }

            console.log(data.email,'- check_contest: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: check_contest ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in check_contest',err)
            res.status(500).send('Something went wrong in check_contest')
          }
    }
}



