/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    review_submit: async function (data, res) {
        try {
            console.log('review_submit : data is ',data);

            // "data": {
            //     "item":"<PRODUCT_SKU>",
            //     "review":"<REVIEW_COMMENTS>",
            //     "provider":"<CUSTOMER_EMAIL>",
            //     "review_id":"<SHOPIFY_ORDER_ID>",
            //     "rating": "<REVIEW_RATING>",
            //     "verified": "<VERIFIED_BOOLEAN>",
            //     "category": "<PRODUCT_CATEGORY>",
            //     "gender": "<PRODUCT_GENDER>"
            // }

            const body = {
                "customer":data.email,
                "action": "review_submit",
                "data": {
                    "item": data.sku,
                    "review": data.review,
                    "provider": data.provider,
                    "review_id": data.review_id,
                    "rating": data.rating,
                    "verified": data.verified,
                    "category": data.category,
                    "gender": data.gender,
                }
            }

            console.log('review_submit : body is ',body);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();
            console.log('review_submit payload: ',payload);

            return payload;

          } catch (err) {
            console.log('Something went wrong in review submit',err)
            res.status(500).send('Something went wrong in review submit')
          }
    }
}



