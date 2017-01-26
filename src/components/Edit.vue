<template>
  <div class="add container" v-show="loading">
    <div class="edit-form" v-if="issetCustomer">
      <h1 class="page-header">{{ $t('editCustomerPageTitle', $lang) }}
        <router-link v-bind:to="'/read/' + $route.params.id" class="btn btn-sm btn-primary pull-right">{{ $t('readMoreBtn', $lang) }}</router-link>
        <button @click="deleteCustomer" class="btn btn-danger pull-right btn-sm" style="margin-right: 10px">{{ $t('deleteBtn', $lang) }}</button>
      </h1>
      <form v-on:submit="editCustomer">
        <div class="row">

          <div class="well col-lg-5">
            <h4>{{ $t('customerInfoFieldsetTitle', $lang) }}</h4>
            <div class="form-group" :class="validation.first_name ? '' : 'has-error'">
              <label for="first_name">{{ $t('firstNameInputLabel', $lang) }}</label>
              <input  v-model="customer.first_name" type="text" class="form-control" :placeholder="$t('firstNameInputPlaceholder', $lang)" id="first_name" tabindex="1">
            </div>
            <div class="form-group" :class="validation.last_name ? '' : 'has-error'">
              <label for="last_name">{{ $t('lastNameInputLabel', $lang) }}</label>
              <input  v-model="customer.last_name" type="text" class="form-control" placeholder="Last Name" id="last_name" tabindex="2">
            </div>
          </div>

          <div class="well col-lg-5 col-lg-offset-2">
            <h4>{{ $t('customerContactFieldSetTitle', $lang) }}</h4>
            <div class="form-group" :class="validation.email ? '' : 'has-error'">
              <label for="email">{{ $t('emailInputLabel', $lang) }}</label>
              <input  v-model="customer.email" type="email" class="form-control" placeholder="example@mail.ru" id="email" tabindex="3">
            </div>
            <div class="form-group" :class="validation.phone ? '' : 'has-error'">
              <label for="phone">{{ $t('phoneInputLabel', $lang) }}</label>
              <input  v-model="customer.phone" type="text"
                      class="form-control"
                      v-mask="'+7(###)-###-##-##'"
                      placeholder="+79818554646" id="phone" tabindex="4">
            </div>
          </div>
        </div>


        <div class="row">
          <div class="well col-lg-5">
            <h4>{{ $t('locationFieldsSetTitle', $lang) }}</h4>
            <div class="form-group" :class="validation.address ? '' : 'has-error'">
              <label for="address">{{ $t('addressInputLabel', $lang) }}</label>
              <input  v-model="customer.address" type="text" class="form-control" placeholder="Your address" id="address" tabindex="5">
            </div>
            <div class="form-group" :class="validation.city ? '' : 'has-error'">
              <label for="city">{{ $t('cityInputLabel', $lang) }}</label>
              <input  v-model="customer.city" type="text" class="form-control" placeholder="City name" id="city" tabindex="6">
            </div>
            <div class="form-group" :class="validation.state ? '' : 'has-error'">
              <label for="state">{{ $t('stateInputLabel', $lang) }}</label>
              <input v-model="customer.state" type="text" class="form-control" placeholder="State title" id="state" tabindex="7">
            </div>
            <div class="form-group">
              <button :disabled="!validationForm" type="submit" class="btn btn-primary">{{ $t('editCustomerBtnLabel', $lang) }}</button>
              <button :disabled="!validationForm" type="button" @click="editAndExit" class="btn btn-success">{{ $t('editAndSaveBtn', $lang) }}</button>
            </div>
          </div>
        </div>

      </form>
    </div>
    <div v-else class="alert alert-danger">
      <h1>{{ $t('error404', $lang) }}</h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'edit',
  data(){
    return {
      loading: false
    }
  },
  methods: {
    editCustomer: function (e) {
      let self = this
      e.preventDefault()
      return new Promise((resolve, reject) => {
        self.updateCustomer({
        id: self.$route.params.id,
        updatecustomer: self.customer
        }).then(() => {
          self.$root.$refs.toastr.s(self.$t('updateCustomerMessage', self.$lang))
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    editAndExit(e){
      let self = this
      this.editCustomer(e).then(() => {
        self.$router.push({path: '/'})
      })
    },
    deleteCustomer(){
      let self = this
      self.removeCustomer({ id: self.$route.params.id }).then(() => {
        window.localStorage.setItem('toast-message', self.$t('deleteCustomerMessage', self.$lang))
        self.$router.push({ path: '/' })
      })
    },
  ...mapActions([
    'removeCustomer',
    'getCustomer',
    'updateCustomer'
  ])
  },
  created(){
    if(this.$root.checkLogin()){
      this.getCustomer({ id: this.$route.params.id })
      this.loading = true
    }
  },
  computed: {
    customer (){
      return this.$store.state.customers.currentCustomer
    },
    issetCustomer(){
      return this.customer.id
    },
    validation () {
      const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const rePhone = /^((\+7)|8)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2}[-. ]?){2}$/
      return {
        first_name: !!(this.customer.first_name.trim().length > 3),
        last_name: !!(this.customer.last_name.trim().length > 3),
        email: !!(reEmail.test(this.customer.email.trim())),
        phone: !!(rePhone.test(this.customer.phone.trim())),
        address: !!(this.customer.address.trim().length > 3),
        city: !!(this.customer.city.trim().length > 3),
        state: !!(this.customer.state.trim().length > 3),
      }
    },
    validationForm () {
      return this.validation.first_name
              && this.validation.last_name
              && this.validation.email
              && this.validation.phone
              && this.validation.address
              && this.validation.city
              && this.validation.state
    },
  },
}
</script>
