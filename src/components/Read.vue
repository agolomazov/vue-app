<template>
  <div class="contact-info" >
    <h1 class="page-header">{{ $t('readCustomerPageTitle', $lang) }}
      <button @click="removeCustomer" class="btn btn-danger pull-right btn-sm">{{ $t('deleteBtn', $lang) }}</button>
      <router-link v-bind:to="'/edit/' + $route.params.id" class="btn btn-sm btn-success pull-right" style="margin-right: 10px">{{ $t('editBtn', $lang) }}</router-link>
    </h1>
    <p class="bg-warning" style="padding: 10px">
      <strong>{{ $t('firstNameInputLabel', $lang) }}</strong>: {{ customer.first_name }} {{ customer.last_name }}<br />
      <strong>{{ $t('emailInputLabel', $lang) }}</strong>: <a :href="'mailto:' + customer.email">{{ customer.email }}</a><br />
      <strong>{{ $t('phoneInputLabel', $lang) }}</strong>: <a :href="'tel:' + customer.phone">{{ customer.phone }}</a><br />
      <strong>{{ $t('locationFieldsSetTitle', $lang) }}</strong>: {{ customer.address }}, {{ customer.city }}, {{ customer.state }}
    </p>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'read',
    computed: {
      customer(){
        return this.$store.state.currentCustomer
      }
    },
    methods: {
      fetchCustomer(){
        let self = this
      },
      removeCustomer(){
        this.deleteCustomer({ id: this.$route.params.id })
        this.$router.push({ path: '/' })
      },
      ...mapMutations([
        'deleteCustomer',
        'setCurrentCustomer'
      ])
    },
    created(){
      this.setCurrentCustomer({ id: this.$route.params.id })
    }
  }
</script>