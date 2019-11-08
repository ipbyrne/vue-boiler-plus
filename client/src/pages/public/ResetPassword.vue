<template>
  <section class="wrapper-bg-tan">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="reset-password-container">
            <h3 class="text-center">Reset Password</h3>
            <span id="reset-password-errors" class="main-validator"></span>
            <div class="row">
              <div class="col-12">
                  <p class="text-center">Enter your email below and we will send you instructions on how to reset your password</p>
                  <input class="form-control" type="email" id="email" placeholder="Email"/>
                  <span id="email_validator" class="validator"></span>
                </div>
            </div>
            <br/>
            <p><button class="btn btn-block margin-center btn-primary" v-on:click="sendResetEmail">Reset Password</button></p>
          </div>

          <div class="reset-token-created-container hide">
            <h3 class="text-center">Your password has been reset!</h3>
            <div class="row ">
              <div class="col-12">
                <p>Instructions on how to reset your password have been sent to your email.</p>
                <p>Note that this link will only be valid for 12 hours. If you do not receive the email, please contact us.</p>
              </div>
            </div>
          </div>

          <div class="set-password-container hide">
            <h3 class="text-center">Reset Password</h3>
            <span id="reset-password-confirmed-errors" class="main-validator"></span>
            <div class="row ">
              <div class="col-12">
                  <input class="form-control" type="password" id="password" placeholder="Password"/>
                  <span id="password_validator" class="validator"></span>
                </div>
                <div class="col-12">
                  <input class="form-control" type="password" id="confirm_password" placeholder="Confirm Password"/>
                  <span id="confirm_password_validator" class="validator"></span>
                </div>
            </div>
            <br/>
            <p><button class="btn btn-block margin-center btn-primary" v-on:click="setPassword">Reset Password</button></p>
          </div>

          <div class="reset-password-completed-container hide">
            <h3 class="text-center">Your password has been reset!</h3>
            <div class="row ">
              <div class="col-12">
                <p><a class="btn btn-block btn-primary" href="/sign-in">Sign In</a></p>
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
import account_helper from '../../js/accounts_helper';


function validateInputs() {
  document.getElementById("email_validator").innerHTML = ""
  // Validate inputs
  let errors = 0
  let email = document.getElementById("email").value;
  if (email == "") {
    document.getElementById("email_validator").innerHTML = "Required.";
    errors++
  } else {
      if (!validation_helper.emailIsValid(email)) {
        document.getElementById("email_validator").innerHTML = "Please enter a valid email.";
        errors++
      }
  }
  if (errors == 0) {
    return true
  } else {
    return false
  }
}

function validatePassword() {
  document.getElementById("password_validator").innerHTML = ""
  document.getElementById("confirm_password_validator").innerHTML = ""
  
  let errors = 0
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password == "") {
    errors++
    document.getElementById("password_validator").innerHTML = "Required."
  }
  if (confirm_password == "") {
    errors++
    document.getElementById("confirm_password_validator").innerHTML = "Required."
  }
  if (password != confirm_password) {
    errors++
    document.getElementById("confirm_password_validator").innerHTML = "Passwords do not match."
  }

  if (errors == 0) {
    return true
  } else {
    return false;
  }
}

export default {
  name: 'ResetPassword',
  data () {
    return {
      email: "",
      password: "",
      reset_token: "",
    }
  },
  beforeCreate: function () {
    seo_helper.setSEOData("Reset Password - Vue Boiler Plus", "A Boiler plate app.");
  },
  mounted: function () {
    let token = window.location.href.split("?")[1]
    if (token.length > 5) {
      this.reset_token = token
      document.getElementsByClassName('reset-password-container')[0].classList.toggle("hide")
      document.getElementsByClassName('set-password-container')[0].classList.toggle("hide")
    }
  },
  methods: {
    sendResetEmail: async function () {
      let inputs_are_valid = validateInputs();
      this.email = document.getElementById("email").value;

      if (inputs_are_valid) {
        // Send Data to Server
        let response  = await account_helper.CreateResetToken(this.email);
        if (response.data.success == false) {
          document.getElementById("reset-password-errors").innerHTML = response.data.message
          return false
        }

        // Change View
        document.getElementsByClassName('reset-password-container')[0].classList.toggle("hide")
        document.getElementsByClassName('reset-token-created-container')[0].classList.toggle("hide")
      }
    },
    setPassword: async function() {
      let password_is_valid = validatePassword()
      if (password_is_valid == false) return
      this.password = document.getElementById("password").value;

      let response = await account_helper.ResetPassword(this.reset_token, this.password);

      if (response.data.success == false) {
          document.getElementById("reset-password-confirmed-errors").innerHTML = response.data.message
      } else {
          document.getElementsByClassName('set-password-container')[0].classList.toggle("hide")
          document.getElementsByClassName('reset-password-completed-container')[0].classList.toggle("hide")
      }
    }
  }
}
</script>

<style scoped>
  .reset-password-container, .reset-token-created-container, .set-password-container, .reset-password-completed-container {
    padding: 16px;
    border: 1px solid black;
    width: 100%;
    max-width: 450px;
    margin-bottom: 32px;
    display: block;
    margin: auto;
  }
</style>
