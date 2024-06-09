/* global api_key, api_url */
const moment = require('moment')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    profile_complete: async function (data, res) {
        try {
            console.log('profile complete: data is ',data);

            var body = {
                "customer":data.email,
                "action": "profile_complete",
                "data": {
                    "profile_completion":true
                }
            }
            if(data.first_name !== undefined) {
                body.data.first_name = data.first_name
            }
            if(data.last_name !== undefined) {
                body.data.last_name = data.last_name;
            }
            if(data.birth_date !== undefined) {
                body.data.birth_date = data.birth_date; // saved as string in YYY-MM-DD format
            }

            if(data.shoe_gender!== undefined) {
                body.data.shoe_gender = data.shoe_gender
            }
            if(data.shoe_boot_size !== undefined) {
                body.data.shoe_boot_size = data.shoe_boot_size
            }
            if(data.sandal_slipper_size !== undefined) {
                body.data.sandal_slipper_size = data.sandal_slipper_size;
            }        
            if(data.colors !== undefined) {
                let colors = data.colors
                colors.toString()
                console.log('colors', colors);
                body.data.colors = data.colors;
            }    
            if(data.interests !== undefined) {
                body.data.interests = data.interests
            }

            console.log('profile complete: body is ',body);
            //throw error message: Action "profile_complete" cannot be repeated

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();
            console.log('profile complete success: payload', payload);

            return payload;

          } catch (err) {
            console.log(err)
            res.status(500).send('failed to complete profile')
          }
    }
}



