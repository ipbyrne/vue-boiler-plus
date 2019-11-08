import axios from 'axios';
import client_config from './client_config';

let account_helper = {
    LogIn: async function (email, password) {
        return await axios.post(client_config.base_url + '/api/user/authenticate', {
            email: email,
            password: password
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    RegisterAccount: async function(firstname, lastname, email, password) {
        return await axios.post(client_config.base_url + '/api/user/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    CreateResetToken: async function(email) {
        return await axios.post(client_config.base_url + '/api/user/create-reset-password-token', {
            email: email
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    ResetPassword: async function(reset_token, password) {
        return await axios.post(client_config.base_url + '/api/user/reset-password', {
            token: reset_token,
            password: password
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log('error');
        }); 
    }
}
export default account_helper