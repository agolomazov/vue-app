<template>
  <div class="contact-info" >
    <h1 class="page-header">Read customer info
      <button @click="deleteCustomer" class="btn btn-danger pull-right btn-sm">Delete</button>
      <router-link v-bind:to="'/edit/' + $route.params.id" class="btn btn-sm btn-success pull-right" style="margin-right: 10px">Edit</router-link>
    </h1>
    <p class="bg-warning" style="padding: 10px">
      <strong>Full Name</strong>: {{ customer.first_name }} {{ customer.last_name }}<br />
      <strong>Email</strong>: <a :href="'mailto:' + customer.email">{{ customer.email }}</a><br />
      <strong>Phone</strong>: <a :href="'tel:' + customer.phone">{{ customer.phone }}</a><br />
      <strong>Address</strong>: {{ customer.address }}, {{ customer.city }}, {{ customer.state }}
    </p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'read',
    data(){
      return {
        customer: { }
      }
    },
    methods: {
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
        let urlRequest = 'http://customers-rest.local/api/customer/delete/' + this.$route.params.id
        let self = this
        axios.delete(urlRequest).then(function () {
          self.$router.push({ path: '/' })
        })
      }
    },
    created(){
      this.fetchCustomer()
    }
  }
</script>