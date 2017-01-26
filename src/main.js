// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import VueMask from 'v-mask'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import locales from './locales'
import Toastr from 'vue-toastr'
require('vue-toastr/dist/vue-toastr.css')
import CustomerModuleStore from './stores/customers'

Vue.use(VueRouter)
Vue.use(VueMask)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.component('vue-toastr',Toastr)

const store = new Vuex.Store({
  modules: {
    customers: CustomerModuleStore
  }
})

Vue.config.lang = 'en'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

const app = new Vue({
  router: router,
  store,
  computed: {
    switchLang(){
      return Vue.config.lang == 'en' ? 'Russian version' : 'English version'
    },
    authUser(){
      var authData = window.localStorage.getItem('auth')
      
      if(!!authData){
        authData = JSON.parse(authData)
      }
      this.loginFlag = !!authData || !this.loginUser
      return authData || this.loginUser
    }
  },
  data: {
    loginUser: {},
    loginFlag: false
  },
  methods: {
    switchUI(e){
      e.preventDefault()
      if(Vue.config.lang == 'en'){
        Vue.config.lang = 'ru'
      } else {
        Vue.config.lang = 'en'
      }
    },
    logoutVk(e){
      e.preventDefault()
      var result = confirm('Вы действительно хотите выйти?')
      if(result){
        VK.Auth.logout()
        this.loginUser = {}
        this.loginFlag = false
        window.sessionStorage.removeItem('token')
        window.localStorage.removeItem('auth')
        this.$router.push({ path: '/login' })
      }
    },
    checkLogin(){
      let token = window.sessionStorage.getItem('token')
      if(!token){
        this.$router.push({ path: '/login' })
        return false
      }
      
      return true
    }
  }
}).$mount('#app')
