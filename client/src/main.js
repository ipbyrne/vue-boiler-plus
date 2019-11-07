// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueDisqus from 'vue-disqus'
import axios from 'axios'

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = "bearer " + token
}
/* Load Components */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(VueDisqus)
