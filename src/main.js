// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import VueMask from 'v-mask'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import locales from './locales'
import storeObject from './store'
import Toastr from 'vue-toastr'
require('vue-toastr/dist/vue-toastr.css')

Vue.use(VueRouter)
Vue.use(VueMask)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.component('vue-toastr',Toastr)

const store = new Vuex.Store(storeObject)

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
