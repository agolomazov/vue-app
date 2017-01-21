<template>
  <div class="contact-info">
    <div class="contant-data" v-if="issetCustomer">
      <h1 class="page-header">{{ $t('readCustomerPageTitle', $lang) }}
        <button @click="removeCustomer" class="btn btn-danger pull-right btn-sm">{{ $t('deleteBtn', $lang) }}</button>
        <router-link v-bind:to="'/edit/' + $route.params.id" class="btn btn-sm btn-success pull-right"
                     style="margin-right: 10px">{{ $t('editBtn', $lang) }}
        </router-link>
      </h1>
      <p class="bg-warning" style="padding: 10px">
        <strong>{{ $t('firstNameInputLabel', $lang) }}</strong>: {{ customer.first_name }} {{ customer.last_name }}<br/>
        <strong>{{ $t('emailInputLabel', $lang) }}</strong>: <a :href="'mailto:' + customer.email">{{ customer.email
        }}</a><br/>
        <strong>{{ $t('phoneInputLabel', $lang) }}</strong>: <a :href="'tel:' + customer.phone">{{ customer.phone }}</a><br/>
        <strong>{{ $t('locationFieldsSetTitle', $lang) }}</strong>: {{ customer.address }}, {{ customer.city }}, {{
        customer.state }}
      </p>
    </div>
    <div v-else class="alert alert-danger">
      <h1>{{ $t('error404', $lang) }}</h1>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'read',
    computed: {
      customer(){
        return this.$store.state.currentCustomer
      },
      issetCustomer(){
        return this.$store.state.currentCustomer.first_name
      }
    },
    methods: {
      fetchCustomer(){
        let self = this
      },
      removeCustomer(){
        this.deleteCustomer({ id: this.$route.params.id })
        window.localStorage.setItem('toast-message', this.$t('deleteCustomerMessage', this.$lang))
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