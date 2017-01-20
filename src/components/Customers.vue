<template>
  <div class="customers container">
    <h1 class="page-header">Customers manager</h1>
    <table class="table" v-if="customers.length > 0">
      <thead>
        <tr>
          <th>FullName</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ `${customer.first_name} ${customer.last_name}`}}</td>
        <td><a v-bind:href="'mailto:' + customer.email" target="_blank">{{ customer.email }}</a></td>
        <td><a v-bind:href="'tel:' + customer.phone">{{ customer.phone }}</a></td>
        <td>
          {{ customer.address }}, {{ customer.city }}, {{ customer.state }}
        </td>
        <td>
          <router-link class="btn btn-primary btn-xs" v-bind:to="'/read/' + customer.id">Read more</router-link>
          <router-link class="btn btn-success btn-xs" v-bind:to="'/edit/' + customer.id">Edit</router-link>
          <button class="btn btn-danger btn-xs" @click="deleteCustomer(customer.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>В базе нет ни одного покупателя</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'customers',
  data () {
    return {
      customers: []
    }
  },
  methods: {
    fetchCustomers(){
      var self = this
      axios.get('http://customers-rest.local/api/customers')
        .then(function (response) {
          console.log(response.data)
          response.data.forEach((item) => {
            self.customers.push(item)
          })
        })
    },
    deleteCustomer(id){
      let self = this
      axios.delete('http://customers-rest.local/api/customer/delete/' + id).then(function(){
        self.customers = self.customers.filter(function (customer) {
          return customer.id !== id
        })
      })
    }
  },
  created() {
     this.fetchCustomers()
  }
}
</script>
