<template>
  <div class="customers container">
    <h1 class="page-header">{{ titlePage }}</h1>
    <table class="table" v-if="customers.length > 0">
      <thead>
      <tr>
        <th>{{ full_name }}</th>
        <th>{{ email }}</th>
        <th>{{ phone }}</th>
        <th>{{ address }}</th>
        <th>{{ actions }}</th>
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
          <router-link class="btn btn-primary btn-xs" v-bind:to="'/read/' + customer.id">{{ readMoreBtn }}</router-link>
          <router-link class="btn btn-success btn-xs" v-bind:to="'/edit/' + customer.id">{{ editBtn }}</router-link>
          <button class="btn btn-danger btn-xs" @click="removeCustomer(customer.id)">{{ deleteBtn }}</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>В базе нет ни одного покупателя</p>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'customers',
    computed: {
      customers(){
        return this.$store.state.customers
      },
      full_name(){
        return this.$t("fullName", this.$lang)
      },
      email(){
        return this.$t("email", this.$lang)
      },
      phone(){
        return this.$t("phone", this.$lang)
      },
      address(){
        return this.$t("address", this.$lang)
      },
      actions(){
        return this.$t("actions", this.$lang)
      },
      titlePage(){
        return this.$t("customerListPageTitle", this.$lang)
      },
      readMoreBtn(){
        return this.$t("readMoreBtn", this.$lang)
      },
      editBtn(){
        return this.$t("editBtn", this.$lang)
      },
      deleteBtn(){
        return this.$t("deleteBtn", this.$lang)
      }
    },
    methods: {
      removeCustomer(id){
        this.deleteCustomer({ id: id })
      },
      ...mapMutations([
        'fetchAllCustomers',
        'deleteCustomer'
      ])
    },
    created() {
      this.fetchAllCustomers()
    }
  }
</script>
