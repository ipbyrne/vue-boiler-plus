<template>
    <div id="app">
        <header class="header-container">            
            <!-- Logged Out Application -->
            <div v-if="authed == false">
                <NavLoggedOut></NavLoggedOut>
            </div>

            <!-- Logged In Application -->
            <div v-if="authed == true">
                <NavLoggedIn></NavLoggedIn>
            </div>
        </header>
        
        <router-view/>

        <Footer></Footer>
    </div>
</template>

<script>
import NavLoggedOut from './components/nav-logged-out/NavLoggedOut.vue';
import NavLoggedIn from './components/nav-logged-in/NavLoggedIn.vue';
import Footer from './components/footer/Footer.vue';
import axios from 'axios'
import client_config from './js/client_config.js'

export default {
  name: 'App',
  components: {
    NavLoggedOut,
    NavLoggedIn,
    Footer
  },
  data () {
    return {
      authed: "null",
      id: "null",
      firstname: "null",
      lastname: "null",
      email: "null"
    }
  },
  beforeCreate: function () {
    CheckAuth().then((response) => {
      if (response.data.success == false) {
        // Set session details
        this.authed = response.data.success
        this.id = "null"
        this.firstname = "null"
        this.lastname = "null"
        this.email = "null"
        if (window.location.href.indexOf('/app/') > 0) {
          window.location.href = "/sign-in"
        }
      } else {
        // Set session details
        this.authed = response.data.success
        this.id = response.data.user._id
        this.firstname = response.data.user.firstname
        this.lastname = response.data.user.lastname
        this.email = response.data.user.email
      }
    })
  },
  created: function () {
    CheckAuth().then((response) => {
      if (response.data.success == false) {
        // Set session details
        this.authed = response.data.success
        this.id = "null"
        this.firstname = "null"
        this.lastname = "null"
        this.email = "null"
        if (window.location.href.indexOf('/app/') > 0) {
          window.location.href = "/sign-in"
        }
      } else {
        // Set session details
        this.authed = response.data.success
        this.id = response.data.user._id
        this.firstname = response.data.user.firstname
        this.lastname = response.data.user.lastname
        this.email = response.data.user.email
      }
    })
  },
  beforeMount: function () {
    CheckAuth().then((response) => {
      if (response.data.success == false) {
        // Set session details
        this.authed = response.data.success
        this.id = "null"
        this.firstname = "null"
        this.lastname = "null"
        this.email = "null"
        if (window.location.href.indexOf('/app/') > 0) {
          window.location.href = "/sign-in"
        }
      } else {
        // Set session details
        this.authed = response.data.success
        this.id = response.data.user._id
        this.firstname = response.data.user.firstname
        this.lastname = response.data.user.lastname
        this.email = response.data.user.email
      }
    })
  },
  mounted: function () {
    CheckAuth().then((response) => {
      if (response.data.success == false) {
        // Set session details
        this.authed = response.data.success
        this.id = "null"
        this.firstname = "null"
        this.lastname = "null"
        this.email = "null"
        if (window.location.href.indexOf('/app/') > 0) {
          window.location.href = "/sign-in"
        }
      } else {
        // Set session details
        this.authed = response.data.success
        this.id = response.data.user._id
        this.firstname = response.data.user.firstname
        this.lastname = response.data.user.lastname
        this.email = response.data.user.email
      }
    })
  },
  updated: function () {
    CheckAuth().then((response) => {
      if (response.data.success == false) {
        // Set session details
        this.authed = response.data.success
        this.id = "null"
        this.firstname = "null"
        this.lastname = "null"
        this.email = "null"
        if (window.location.href.indexOf('/app/') > 0) {
          window.location.href = "/sign-in"
        }
      } else {
        // Set session details
        this.authed = response.data.success
        this.id = response.data.user._id
        this.firstname = response.data.user.firstname
        this.lastname = response.data.user.lastname
        this.email = response.data.user.email
      }
    })
  }
}

function CheckAuth (to) {
  return axios.post(client_config.base_url + '/api/user/check-auth', {}, {
    headers: {'Authorization': "bearer " + localStorage.getItem('token')}
  })
  .then(function (response, to) {
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}

</script>

<style lang="styl">
  @import './styl/styles.styl';
</style>
