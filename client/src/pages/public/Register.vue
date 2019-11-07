<template>
    <section class="wrapper-bg-tan">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card margin-center">
                        <h3 class="text-center">Create an Account</h3>
                        <span id="register-errors" class="main-validator"></span>
                        <div class="row">
                            <div class="col-12">
                                <input class="form-control" type="text" id="firstname" placeholder="First Name"/>
                                <span id="firstname_validator" class="validator"></span>
                            </div>
                            <div class="col-12">
                                <input class="form-control" type="text" id="lastname" placeholder="Last Name"/>
                                <span id="lastname_validator" class="validator"></span>
                            </div>
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
                        <p><button class="btn btn-block margin-center btn-primary" v-on:click="registerAccount">Submit</button></p>
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

function validateAccountInfo() {
  document.getElementById("firstname_validator").innerHTML = ""
  document.getElementById("lastname_validator").innerHTML = ""
  document.getElementById("email_validator").innerHTML = ""
  document.getElementById("password_validator").innerHTML = ""
  // Validate inputs
  let errors = 0
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
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
      } else {
        if (!validation_helper.emailIsNotInUse(email)) {
            document.getElementById("email_validator").innerHTML = "This email is already in use.";
            errors++
        }
      }
  }
  if (password == "") {
    document.getElementById("password_validator").innerHTML = "Required."
    errors++
  }
  
  return errors == 0;
}

export default {
    name: 'Register',
    data () {
        return {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        }
    },
    beforeCreate: function () {
        seo_helper.setSEOData("Register - Vue Boiler Plus", "A Boiler plate app.");
    },
    methods: {
        registerAccount: async function () {
            let inputs_are_valid = validateAccountInfo();
            this.firstname = document.getElementById("firstname").value;
            this.lastname = document.getElementById("lastname").value;
            this.email = document.getElementById("email").value;
            this.password = document.getElementById("password").value;


            if (inputs_are_valid) {
                // Send Data to Server
                let token = await axios.post(client_config.base_url + '/api/user/register', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password
                })
                .then(function (response) {
                    if (response.data.success == false) {
                        document.getElementById("register-errors").innerHTML = response.data.message;
                        return false;
                    } else {
                        return response.data.token
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if (token != false) {
                    localStorage.setItem('token', token)
                    this.$parent.authed = true
                    window.location.href = "/app/my-account";
                }
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
