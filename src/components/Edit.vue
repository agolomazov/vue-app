<template>
  <div class="add container">
    <h1 class="page-header">Edit Customer
      <router-link v-bind:to="'/read/' + $route.params.id" class="btn btn-sm btn-primary pull-right">Read</router-link>
      <button @click="deleteCustomer" class="btn btn-danger pull-right btn-sm" style="margin-right: 10px">Delete</button>
    </h1>
    <form v-on:submit="editCustomer">
      <div class="well">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input  v-model="customer.first_name" type="text" class="form-control" placeholder="First Name" id="first_name" tabindex="1">
        </div>
        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input  v-model="customer.last_name" type="text" class="form-control" placeholder="Last Name" id="last_name" tabindex="2">
        </div>
      </div>

      <div class="well">
        <h4>Customer contacts</h4>
        <div class="form-group">
          <label for="email">Email</label>
          <input  v-model="customer.email" type="email" class="form-control" placeholder="example@mail.ru" id="email" tabindex="3">
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input  v-model="customer.phone" type="text"
                  class="form-control"
                  v-mask="'+7(###)-###-##-##'"
                  placeholder="+79818554646" id="phone" tabindex="4">
        </div>
      </div>

      <div class="well">
        <h4>Location</h4>
        <div class="form-group">
          <label for="address">Address</label>
          <input  v-model="customer.address" type="text" class="form-control" placeholder="Your address" id="address" tabindex="5">
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <input  v-model="customer.city" type="text" class="form-control" placeholder="City name" id="city" tabindex="6">
        </div>

        <div class="form-group">
          <label for="state">State</label>
          <input v-model="customer.state" type="text" class="form-control" placeholder="State title" id="state" tabindex="7">
        </div>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" v-bind:disabled="disabledSubmit">Edit customer</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'edit',
  data () {
    return {
      customer: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: ''
      }
    }
  },
  methods: {
    editCustomer: function (e) {
      e.preventDefault()
      let requestUrl = 'http://customers-rest.local/api/customer/update/' + this.$route.params.id
      let self = this
      let updatecustomer = Object.assign({}, this.customer)
      this.$http.put(requestUrl, updatecustomer).then(function (response) {
          self.$router.push({ path: '/' })
      })
    },
    validateEmail: function(value){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(value)
    },
    isEmpty: function (value) {
      return value.trim() !== ''
    },
    validatePhone: function (value) {
      var re = /^((\+7)|8)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2}[-. ]?){2}$/
      return re.test(value)
    },
    fetchCustomer(){
      let self = this
      let urlRequest = 'http://customers-rest.local/api/customer/' + this.$route.params.id
      axios.get(urlRequest).then(function (response) {
        let responseData = response.data
        if(!responseData){
          this.$router.push({ path: '/' })
          return
        }

        self.customer = responseData

      })
    },
    deleteCustomer(){
      let requestUrl = 'http://customers-rest.local/api/customer/delete/' + this.customerId
      let self = this
      axios.delete(requestUrl).then(function (response) {
        self.$router.push({ path: '/' })
      })
    }
  },
  mounted: function () {
    document.getElementById('first_name').focus()
  },
  created(){
    this.fetchCustomer()
  },
  computed: {
    disabledSubmit: function () {
      return  !this.isEmpty(this.customer.first_name) ||
              !this.isEmpty(this.customer.last_name)  ||
              !this.validateEmail(this.customer.email) ||
              !this.validatePhone(this.customer.phone) ||
              !this.isEmpty(this.customer.address) ||
              !this.isEmpty(this.customer.city) ||
              !this.isEmpty(this.customer.state)
    },
    customerId: function () {
      return this.$route.params.id
    }
  }
}
</script>
