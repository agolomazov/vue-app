<template>
  <div class="add container">
    <div class="edit-form" v-if="issetCustomer">
      <h1 class="page-header">{{ $t('editCustomerPageTitle', $lang) }}
        <router-link v-bind:to="'/read/' + $route.params.id" class="btn btn-sm btn-primary pull-right">{{ $t('readMoreBtn', $lang) }}</router-link>
        <button @click="deleteCustomer" class="btn btn-danger pull-right btn-sm" style="margin-right: 10px">{{ $t('deleteBtn', $lang) }}</button>
      </h1>
      <form v-on:submit="editCustomer">
        <div class="row">

          <div class="well col-lg-5">
            <h4>{{ $t('customerInfoFieldsetTitle', $lang) }}</h4>
            <div class="form-group">
              <label for="first_name">{{ $t('firstNameInputLabel', $lang) }}</label>
              <input  v-model="customer.first_name" type="text" class="form-control" placeholder="First Name" id="first_name" tabindex="1">
            </div>
            <div class="form-group">
              <label for="last_name">{{ $t('lastNameInputLabel', $lang) }}</label>
              <input  v-model="customer.last_name" type="text" class="form-control" placeholder="Last Name" id="last_name" tabindex="2">
            </div>
          </div>

          <div class="well col-lg-5 col-lg-offset-2">
            <h4>{{ $t('customerContactFieldSetTitle', $lang) }}</h4>
            <div class="form-group">
              <label for="email">{{ $t('emailInputLabel', $lang) }}</label>
              <input  v-model="customer.email" type="email" class="form-control" placeholder="example@mail.ru" id="email" tabindex="3">
            </div>
            <div class="form-group">
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
            <div class="form-group">
              <label for="address">{{ $t('addressInputLabel', $lang) }}</label>
              <input  v-model="customer.address" type="text" class="form-control" placeholder="Your address" id="address" tabindex="5">
            </div>
            <div class="form-group">
              <label for="city">{{ $t('cityInputLabel', $lang) }}</label>
              <input  v-model="customer.city" type="text" class="form-control" placeholder="City name" id="city" tabindex="6">
            </div>
            <div class="form-group">
              <label for="state">{{ $t('stateInputLabel', $lang) }}</label>
              <input v-model="customer.state" type="text" class="form-control" placeholder="State title" id="state" tabindex="7">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">{{ $t('editCustomerBtnLabel', $lang) }}</button>
              <button type="button" @click="editAndExit" class="btn btn-success">{{ $t('editAndSaveBtn', $lang) }}</button>
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
    this.getCustomer({ id: this.$route.params.id })
  },
  computed: {
    customer (){
      return this.$store.state.currentCustomer
    },
    issetCustomer(){
      return this.$store.state.currentCustomer.first_name
    }
  }
}
</script>
