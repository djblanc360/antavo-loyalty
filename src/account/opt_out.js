/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    opt_out: async function (data, res) {
        try {
            console.log(data.email,'- opt out, passed data: ',data);

            const body = {
                "customer":data.email,
                "action": "opt_out",
                "data": {
                    "reason":data.reason,
                    "domain":data.store_name
                }
            }

            console.log(data.email,'- opt out, payload is: ',body);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            const payload = await response.json();
            console.log(data.email,'- opt out success: ',payload);

            return payload;

          } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong')
          }
    }
}



