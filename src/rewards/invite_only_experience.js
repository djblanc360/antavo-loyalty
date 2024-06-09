/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    invite_only_experience: async function (data, res) {
        try {
            console.log(data.email,'- in invite_only_experience',customer);
            

            const body = {
                "customer":data.email,
                "action": "invite_only_experience",
                "data": {
                    "event":data.event
                }
            }

            console.log(data.email,'- invite_only_experience: body is ',data);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            console.log(data.email,'- success: invite_only_experience ',payload);

            return payload;

          } catch (err) {
            console.log(data.email,'- Something went wrong in invite only experience',err)
            res.status(500).send('Something went wrong in invite only experience')
          }
    }
}



