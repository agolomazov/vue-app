// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import VueMask from 'v-mask'
import Vuex from 'vuex'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import locales from './locales'


Vue.use(VueRouter)
Vue.use(VueMask)
Vue.use(Vuex)
Vue.use(VueI18n)

Vue.config.lang = 'en'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

const store = new Vuex.Store({
  state: {
    customers: [],
    currentCustomer: {}
  },
  mutations: {
    fetchAllCustomers(state){
      state.currentCustomer = {}
      axios.get('http://customers-rest.local/api/customers')
        .then(function (response) {
          state.customers = []
          response.data.forEach(function (item) {
            state.customers.push(item)
          })
        })
    },
    deleteCustomer(state, playload){
      axios.delete('http://customers-rest.local/api/customer/delete/' + playload.id).then(function () {
        state.customers = state.customers.filter(function (customer) {
          return customer.id !== playload.id
        })
      })
    },
    setCurrentCustomer(state, playload){
      let urlRequest = 'http://customers-rest.local/api/customer/' + playload.id
      axios.get(urlRequest).then(function (response) {
        let responseData = response.data
        if(!responseData){
          Vuex.router.push({ path: '/' })
          return
        }
    
        state.currentCustomer = responseData
    
      })
    },
    updateCustomer(state, playload){
      let requestUrl = 'http://customers-rest.local/api/customer/update/' + playload.id
      axios.put(requestUrl, playload.updatecustomer).then( () => {
        app.$router.push({ path: '/' })
      })
    },
    addCustomer(state, playload){
      axios.post('http://customers-rest.local/api/customer/add', playload.newCustomer).then(
        function (response) {
          app.$router.push({ path: '/' })
        }
      )
    }
  }
})


const app = new Vue({
  router: router,
  store,
  computed: {
    switchLang(){
      return Vue.config.lang == 'en' ? 'Russian version' : 'English version'
    },
    customerLink(){
      return this.$t("customerListPageTitle", this.$lang)
    },
    aboutLinkLabel(){
      return this.$t("aboutLinkLabel", this.$lang)
    },
    addCustomerLink(){
      return this.$t("addCustomerLink", this.$lang)
    }
  },
  methods: {
    switchUI(e){
      e.preventDefault()
      if(Vue.config.lang == 'en'){
        Vue.config.lang = 'ru'
      } else {
        Vue.config.lang = 'en'
      }
    }
  }
}).$mount('#app')
