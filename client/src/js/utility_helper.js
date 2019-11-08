import axios from 'axios';
import client_config from './client_config';

let utility_helper = {
    SendContactEmail: async function (email, subject, message) {
        return await axios.post(client_config.base_url + '/api/utilities/send-email', {
            email: email,
            subject: subject,
            message: message
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}
export default utility_helper;