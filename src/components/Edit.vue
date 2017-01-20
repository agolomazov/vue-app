<template>
  <div class="add container">
    <h1 class="page-header">Edit Customer
      <router-link v-bind:to="'/read/' + $route.params.id" class="btn btn-sm btn-primary pull-right">Read</router-link>
      <button @click="removeCustomer" class="btn btn-danger pull-right btn-sm" style="margin-right: 10px">Delete</button>
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
        <button type="submit" class="btn btn-primary">Edit customer</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'edit',
  methods: {
    editCustomer: function (e) {
      let self = this
      e.preventDefault()
      self.updateCustomer({
        id: this.$route.params.id,
        updatecustomer: this.customer
      })
    },
    fetchCustomer(){
      this.setCurrentCustomer({ id: this.$route.params.id })
    },
    removeCustomer(){
      this.deleteCustomer({ id: this.$route.params.id })
    },
  ...mapMutations([
    'deleteCustomer',
    'setCurrentCustomer',
    'updateCustomer'
  ])
  },
  mounted: function () {
    document.getElementById('first_name').focus()
  },
  created(){
    this.setCurrentCustomer({ id: this.$route.params.id })
  },
  computed: {
    customer (){
      return this.$store.state.currentCustomer
    }
  }
}
</script>
