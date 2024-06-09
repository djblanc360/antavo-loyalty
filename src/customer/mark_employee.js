/* global api_key, api_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    mark_employee: async function (customer, res) {
        try {
            console.log('mark_employee');
            console.log('body is ',customer);

            const body = {
                "customer":customer.email,
                "action": "mark_employee",
                "data": {
                    "employee":customer.employee
                }
            }
            
            console.log('payload', body);

            const response = await fetch(api_url+'/events?api_key='+api_key, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
            let payload = await response.json();

            return payload;

          } catch (err) {
            console.log(err)
            res.status(500).send('Failed to mark employee')
          }
    }
}



