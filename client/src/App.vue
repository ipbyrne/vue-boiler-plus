<template>
    <div id="app">
        <header class="header-container">            
            <!-- Logged Out Application -->
            <div v-if="store.state.authed == false">
                <NavLoggedOut></NavLoggedOut>
            </div>

            <!-- Logged In Application -->
            <div v-if="store.state.authed == true">
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
import client_config from './js/client_config.js'
import store from './store/store'

export default {
  name: 'App',
  components: {
    NavLoggedOut,
    NavLoggedIn,
    Footer
  },
  data () {
    return {
      store: store
    }
  },
  beforeCreate: async function() {
    await store.isAuthenticated();
  }
}

</script>

<style lang="styl">
  @import './styl/styles.styl';
</style>
