<template>
  <section class="wrapper-bg-tan">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div id="account-info" class="card">
            <h3>Account Info</h3>
            <span id="account-info-errors" class="main-validator"></span>
            <div class="account-info-container">
              <br/>
              <div class="row">
                <div class="col-6">
                  <input class="form-control" type="text" id="firstname" placeholder="First Name" v-bind:value="this.firstname"/>
                  <span id="firstname_validator" class="validator"></span>
                </div>
                <div class="col-6">
                  <input class="form-control" type="text" id="lastname" placeholder="Last Name" v-bind:value="this.lastname"/>
                  <span id="lastname_validator" class="validator"></span>
                </div>
                <div class="col-12">
                  <input class="form-control" type="email" id="email" placeholder="Email" v-bind:value="this.email"/>
                  <span id="email_validator" class="validator"></span>
                </div>
                <div class="change-password-inputs hide">
                  <div class="col-12">
                    <input class="form-control" type="password" id="password" placeholder="New Password"/>
                    <span id="password_validator" class="validator"></span>
                  </div>
                  <div class="col-12">
                    <input class="form-control" type="password" id="confirm_password" placeholder="Confrim Password"/>
                    <span id="confirm_password_validator" class="validator"></span>
                  </div>
                </div>
                <div class="change-password-btn col-12">
                  <button class="btn btn-block" v-on:click="showPasswordInputs">Change Password</button>
                </div>
                <div class="col-12">
                  <br/>
                  <button class="btn btn-block btn-primary" v-on:click="updateAccountInfo">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import client_config from '../../js/client_config.js'
import seo_helper from '../../js/seo_helper.js'
import validation_helper from '../../js/validation_helper.js'

function validateAccountInfo() {
  document.getElementById("firstname_validator").innerHTML = ""
  document.getElementById("lastname_validator").innerHTML = ""
  document.getElementById("email_validator").innerHTML = ""
  document.getElementById("password_validator").innerHTML = ""
  document.getElementById("confirm_password_validator").innerHTML = ""

  // Validate inputs
  let errors = 0
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;
  if (firstname == "") {
    document.getElementById("firstname_validator").innerHTML = "Required.";
    errors++
  }
  if (lastname == "") {
    document.getElementById("lastname_validator").innerHTML = "Required.";
    errors++
  }
  if (email == "") {
    document.getElementById("email_validator").innerHTML = "Required.";
    errors++
  } else {
      if (!validation_helper.emailIsValid(email)) {
        document.getElementById("email_validator").innerHTML = "Please enter a valid email.";
        errors++
      }
  }
  if (password != "" || confirm_password != "" ) {
    if (password == "") {
      document.getElementById("password_validator").innerHTML = "Required."
      errors++
    }
    if (confirm_password == "") {
      errors++
      document.getElementById("confirm_password_validator").innerHTML = "Required."
    }
    if (password != confirm_password) {
      errors++
      document.getElementById("confirm_password_validator").innerHTML = "Passwords do not match."
    }
  }
  if (errors == 0) {
    return true
  } else {
    return false
  }
}

export default {
  name: 'MyAccount',
  data () {
    return {
      firstname: this.$parent.store.state.firstname,
      lastname: this.$parent.store.state.lastname,
      email: this.$parent.store.state.email,
      password: "",
      new_password: "",
    }
  },
  beforeCreate: function () {
    seo_helper.setSEOData("My Account - Vue Boiler Plus", "A Boiler plate app.");
  },
  methods: {
    updateAccountInfo: async function () {
      let validate_inputs = validateAccountInfo()
      if (validate_inputs == false) return
      let firstname = document.getElementById('firstname').value;
      let lastname = document.getElementById('lastname').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirm_password = document.getElementById('password').value;

      let updated = await axios.post(client_config.base_url + '/api/user/update', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password == "" && confirm_password == "" ? "" : password
      },
      {
        headers: {'Authorization': "bearer " + localStorage.getItem('token')}
      })
      .then(function (response) {
        document.getElementById("account-info-errors").innerHTML = response.data.message
        if (response.data.success == false) {
          return false
        } else {
          if (document.getElementsByClassName('change-password-inputs')[0].classList.contains("hide") == false) {
            document.getElementsByClassName('change-password-inputs')[0].classList.toggle('hide')
            document.getElementsByClassName('change-password-btn')[0].classList.toggle('hide')
          }
          return true
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    },
    showPasswordInputs: function () {
      document.getElementsByClassName('change-password-inputs')[0].classList.toggle('hide')
      document.getElementsByClassName('change-password-btn')[0].classList.toggle('hide')
    },
  },
}
</script>

<style scoped>
  .change-password-inputs {
    width: 100%;
  }
</style>
