import axios from 'axios';
import client_config from '../js/client_config';

let store = {
    state: {
        authed: false,
        id: "",
        firstname: "",
        lastname: "",
        email: ""
    },
    CheckAuth: async function () {
        let res = await axios.post(client_config.base_url + '/api/account/check-auth')
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
        if (res.data.success) {
            this.state.authed = res.data.success
            this.state.id = res.data.account._id
            this.state.firstname = res.data.account.firstname
            this.state.lastname = res.data.account.lastname
            this.state.email = res.data.account.email
        } else {
            this.state.authed = res.data.success
            this.state.id = ""
            this.state.firstname = ""
            this.state.lastname = ""
            this.state.email = ""
        }
        return this.state.authed;
    },
    isAuthenticated: function () {
        return this.CheckAuth();
    }
}
export default store;