<template>
  <section class="wrapper-bg-tan">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6">
          <h3>We'd Love to Hear From You!</h3>
          <span id="contact-form-errors" class="main-validator"></span>
          <input class="form-control" type="email" id="email" placeholder="Email"/>
          <span id="email_validator" class="validator"></span>
          <input class="form-control" type="text" id="subject" placeholder="Subject"/>
          <span id="subject_validator" class="validator"></span>
          <textarea rows="5" class="form-control" type="text" id="message" placeholder="Message"></textarea>
          <span id="message_validator" class="validator"></span>
          <br/>
          <button class="btn btn-primary btn-block" v-on:click="sendEmail">Submit</button>
          <br/>
          <br/>
        </div>

        <div class="col-12 col-sm-6">
          <h3>We'll Keep It Between Us</h3>
          <p>
            Anything you share with us will remain strictly with us. Unlike most of our competitors, we are not in the business of selling your data. If you have any questions please feel free to contact us or read our privacy policy listed at the bottom of this page.
          </p>
          <h3>Contact by Email</h3>
          <p>
            <strong><a href="mailto:email@gmail.com">email@gmail.com</a></strong>
            <br/>
            Response within 24 business hours.
          </p>
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
import utility_helper from '../../js/utility_helper';

function validateInputs () {
  document.getElementById("email_validator").innerHTML = "";
  document.getElementById("subject_validator").innerHTML = "";
  document.getElementById("message_validator").innerHTML = "";

  // Validate inputs
  let errors = 0
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;
  if (email == "") {
    document.getElementById("email_validator").innerHTML = "Required.";
    errors++
  } else {
      if (!validation_helper.emailIsValid(email)) {
        document.getElementById("email_validator").innerHTML = "Please enter a valid email.";
        errors++
      }
  }
  if (subject == "") {
    document.getElementById("subject_validator").innerHTML = "Required."
    errors++
  }

  if (message == "") {
    document.getElementById("message_validator").innerHTML = "Required."
    errors++
  }

  if (errors == 0) {
    return true
  } else {
    return false
  }
}

export default {
  name: 'Contact',
  data () {
    return {
      email: "",
      subject: "",
      message: "",
    }
  },
  beforeCreate: function () {
    seo_helper.setSEOData("Contact Us - Vue Boiler Plus", "A Boiler plate app.");
  },
  methods: {
    sendEmail: async function() {
      let inputs_are_valid = validateInputs();
      if (inputs_are_valid == false) return;
      this.email = document.getElementById("email").value;
      this.subject = document.getElementById("subject").value;
      this.message = document.getElementById("message").value;

      let response = await utility_helper.SendContactEmail(this.email,  this.subject, this.message);

      document.getElementById("contact-form-errors").innerHTML = response.data.message
      if (response.data.success) {
        // Clear inputs
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
      }
    }
  }
}
</script>

<style scoped>
  
</style>
