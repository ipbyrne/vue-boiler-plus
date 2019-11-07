import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/public/Home'
import NotFound from '@/pages/public/404'
import Contact from '@/pages/public/Contact'
import BlogList from '@/pages/public/BlogList'
import BlogSingle from '@/pages/public/BlogSingle'
import SignIn from '@/pages/public/SignIn'
import Register from '@/pages/public/Register'
import ResetPassword from '@/pages/public/ResetPassword'
import PrivacyPolicy from '@/pages/public/PrivacyPolicy'
import ToS from '@/pages/public/ToS'
import MyAccount from '@/pages/private/MyAccount'
import store from '../store/store.js'

const ifNotAuthenticated = async (to, from, next) => {
  let authenticated = await store.isAuthenticated();
  if (!authenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = async (to, from, next) => {
  let authenticated = await store.isAuthenticated();
  if (authenticated) {
    next()
    return
  }
  next('/sign-in')
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '*', 
      component: NotFound 
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/blog',
      name: 'Blog',
      component: BlogList
    },
    {
      path: '/blog/:slug',
      name: 'blog-single',
      component: BlogSingle
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/app/my-account',
      name: 'MyAccount',
      component: MyAccount,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/terms-of-service',
      name: 'ToS',
      component: ToS
    }
  ]
})
