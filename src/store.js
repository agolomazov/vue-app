import Vuex from 'vuex'
import axios from 'axios'
const API_URL = 'http://customers.rest/api/'

export default {
  state: {
    customers: [],
    currentCustomer: {}
  },
  mutations: {
    fetchAllCustomers(state){
      state.currentCustomer = {}
      axios.get(API_URL + 'customers')
        .then(function (response) {
          state.customers = []
          response.data.forEach(function (item) {
            state.customers.push(item)
          })
        })
    },
    deleteCustomer(state, playload){
      axios.delete(API_URL + 'customer/delete/' + playload.id).then(function () {
        state.customers = state.customers.filter(function (customer) {
          return customer.id !== playload.id
        })
      })
    },
    setCurrentCustomer(state, playload){
      let urlRequest = API_URL + 'customer/' + playload.id
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
      let requestUrl = API_URL + 'customer/update/' + playload.id
      axios.put(requestUrl, playload.updatecustomer).then( () => {
        app.$router.push({ path: '/' })
      })
    },
    addCustomer(state, playload){
      axios.post(API_URL + 'customer/add', playload.newCustomer).then(
        function (response) {
          app.$router.push({ path: '/' })
        }
      )
    }
  }
}