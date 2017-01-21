import axios from 'axios'
const API_URL = 'http://customers.rest/api/'

export default {
  state: {
    customers: [],
    currentCustomer: {}
  },
  mutations: {
    fetchAllCustomers(state, payload){
      state.customers = payload.customers
    },
    deleteCustomer(state, playload){
      let customers = state.customers.filter((item) => {
        return item.id != playload.id
      })
      state.customers = customers
    },
    setEmptyCurrentCustomer(state){
      state.currentCustomer = {}
    },
    setCurrentCustomer(state, payload){
      state.currentCustomer = Object.assign({}, payload.currentCustomer)
    },
    insertCustomer(state, payload){
      state.customers.push(payload.newCustomer)
    }
  },
  actions: {
    getAllCustomers(context){
      return new Promise((resolve, reject) => {
        axios.get(API_URL + 'customers')
          .then(function (response) {
            context.commit('fetchAllCustomers', {
              customers: response.data
            })
            context.commit('setEmptyCurrentCustomer')
            resolve()
          }).catch(() => {
            reject()
          })
      })
    },
    removeCustomer(context, payload){
      let customerId = payload.id
      return new Promise((resolve, reject) => {
        axios.delete(API_URL + 'customer/delete/' + customerId)
          .then(function () {
            context.commit('deleteCustomer', { id: customerId })
            resolve()
          }).catch(function () {
            reject()
          })
      })
    },
    getCustomer(context, payload){
      let customerId = payload.id
      return new Promise((resolve, reject) => {
        let urlRequest = API_URL + 'customer/' + customerId
        axios.get(urlRequest).then(function (response) {
          context.commit('setCurrentCustomer', {
            currentCustomer: response.data
          })
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    addCustomer(context, payload){
      let newCustomer = payload.newCustomer
      return new Promise((resolve, reject) => {
        axios.post(API_URL + 'customer/add', newCustomer).then(() => {
          context.commit('insertCustomer', {
            newCustomer: newCustomer
          })
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    updateCustomer(context, payload){
      let updateCustomer = payload.updatecustomer
      let id = payload.id
      return new Promise((resolve, reject) => {
        axios.put(API_URL + 'customer/update/' + id, updateCustomer).then(() => {
          context.commit('setCurrentCustomer', {
            currentCustomer: updateCustomer
          })
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}