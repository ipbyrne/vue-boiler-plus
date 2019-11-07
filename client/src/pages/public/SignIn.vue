<template>
  <section class="wrapper-bg-tan">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card margin-center">
            <h3 class="text-center">Sign In</h3>
            <span id="sign-in-errors" class="main-validator"></span>
            <div class="row">
              <div class="col-12">
                  <input class="form-control" type="email" id="email" placeholder="Email"/>
                  <span id="email_validator" class="validator"></span>
                </div>
                <div class="col-12">
                  <input class="form-control" type="password" id="password" placeholder="Password"/>
                  <span id="password_validator" class="validator"></span>
                </div>
            </div>
            <br/>
            <p><button class="btn btn-block margin-center btn-primary" v-on:click="signIn">Sign In</button></p>
            <p class="text-center">
              Need an account? <router-link to="/register">Register here.</router-link>
              <br/>
              <router-link to="/reset-password">Reset Password</router-link>
            </p>
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

function validateInputs() {
  document.getElementById("email_validator").innerHTML = ""
  document.getElementById("password_validator").innerHTML = ""
  // Validate inputs
  let errors = 0
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (email == "") {
    document.getElementById("email_validator").innerHTML = "Required.";
    errors++
  } else {
      if (!validation_helper.emailIsValid(email)) {
        document.getElementById("email_validator").innerHTML = "Please enter a valid email.";
        errors++
      }
  }
  if (password == "") {
    document.getElementById("password_validator").innerHTML = "Required."
    errors++
  }
  if (errors == 0) {
    return true
  } else {
    return false
  }
}

export default {
  name: 'SignIn',
  data () {
    return {
      email: "",
      password: "",
    }
  },
  beforeCreate: function () {
    seo_helper.setSEOData("Sign In - Vue Boiler Plus", "A Boiler plate app.");
  },
  methods: {
    signIn: async function () {
      let inputs_are_valid = validateInputs();
      this.email = document.getElementById("email").value;
      this.password = document.getElementById("password").value;


      if (inputs_are_valid) {
        // Send Data to Server
        this.$parent.authed = await axios.post(client_config.base_url + '/api/user/authenticate', {
          email: this.email,
          password: this.password
        })
        .then(function (response) {
          if (response.data.success == false) {
            document.getElementById("sign-in-errors").innerHTML = response.data.message
            return false
          } else {
            localStorage.setItem('token', response.data.token)
            window.location.href = "/app/my-account";
            return true
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
}

</script>

<style>
  .card {
    max-width: 350px;
  }
</style>
