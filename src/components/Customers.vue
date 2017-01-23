<template>
  <div class="customers container">
    <h1 class="page-header">{{ $t('customerListPageTitle', $lang) }}</h1>
    <table class="table" v-if="customers.length > 0">
      <thead>
      <tr>
        <th>{{ $t("fullName", $lang) }}</th>
        <th>{{ $t("email", $lang) }}</th>
        <th>{{ $t("phone", $lang) }}</th>
        <th>{{ $t("address", $lang) }}</th>
        <th>{{ $t("actions", $lang) }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ `${customer.first_name} ${customer.last_name}`}}</td>
        <td><a :href="'mailto:' + customer.email" target="_blank">{{ customer.email }}</a></td>
        <td><a :href="'tel:' + customer.phone">{{ customer.phone }}</a></td>
        <td>
          {{ customer.address }}, {{ customer.city }}, {{ customer.state }}
        </td>
        <td>
          <router-link class="btn btn-primary btn-xs" :to="'/read/' + customer.id">{{ $t("readMoreBtn", $lang) }}</router-link>
          <router-link class="btn btn-success btn-xs" :to="'/edit/' + customer.id">{{ $t("editBtn", $lang) }}</router-link>
          <button class="btn btn-danger btn-xs" @click="deleteCustomer(customer.id)">{{ $t("deleteBtn", $lang) }}</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>В базе нет ни одного покупателя</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'customers',
    computed: {
      customers(){
        return this.$store.state.customers.customers
      }
    },
    methods: {
      deleteCustomer(id){
        let self = this
        self.removeCustomer({ id: id }).then(function() {
          self.$root.$refs.toastr.s(self.$t('deleteCustomerMessage', self.$lang))
        })
      },
      ...mapActions([
        'getAllCustomers',
        'removeCustomer'
      ])
    },
    created() {
      if(window.localStorage.getItem('toast-message')){
        var message = window.localStorage.getItem('toast-message')
        window.localStorage.removeItem('toast-message')
        this.$root.$refs.toastr.s(message)
      }
      this.getAllCustomers()
    }
  }
</script>
