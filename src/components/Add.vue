<template>
  <div class="add container">
    <h1 class="page-header">{{ $t('addCustomerLink', $lang) }}</h1>
    <form v-on:submit="addCustomer">

      <div class="row">

        <div class="well col-lg-5">
          <h4>{{ $t('customerInfoFieldsetTitle', $lang) }}</h4>
          <div class="form-group" :class="validation.first_name ? '' : 'has-error'">
            <label for="first_name">{{ $t('firstNameInputLabel', $lang) }}</label>
            <input v-model="customer.first_name" type="text" class="form-control" :placeholder="$t('firstNameInputPlaceholder', $lang)"
                   id="first_name" tabindex="1">
          </div>
          <div class="form-group" :class="validation.last_name ? '' : 'has-error'">
            <label for="last_name">{{ $t('lastNameInputLabel', $lang) }}</label>
            <input v-model="customer.last_name" type="text" class="form-control" :placeholder="$t('lastNameInputPlaceholder', $lang)" id="last_name"
                   tabindex="2">
          </div>
        </div>

        <div class="well col-lg-5 col-lg-offset-2">
          <h4>{{ $t('customerContactFieldSetTitle', $lang) }}</h4>
          <div class="form-group" :class="validation.email ? '' : 'has-error'">
            <label for="email">{{ $t('emailInputLabel', $lang) }}</label>
            <input v-model="customer.email" type="email" class="form-control" :placeholder="$t('emailInputPlaceholder', $lang)" id="email"
                   tabindex="3">
          </div>
          <div class="form-group" :class="validation.phone ? '' : 'has-error'">
            <label for="phone">{{ $t('phoneInputLabel', $lang) }}</label>
            <input v-model="customer.phone" type="text"
                   v-mask="'+7(###)-###-##-##'"
                   class="form-control" :placeholder="$t('phoneInputPlaceholder', $lang)" id="phone"
                   tabindex="4">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="well col-lg-5">
          <h4>{{ $t('locationFieldsSetTitle', $lang) }}</h4>
          <div class="form-group" :class="validation.address ? '' : 'has-error'">
            <label for="address">{{ $t('addressInputLabel', $lang) }}</label>
            <input v-model="customer.address" type="text" class="form-control" :placeholder="$t('addressInputPlaceholder', $lang)" id="address"
                   tabindex="5">
          </div>
          <div class="form-group" :class="validation.city ? '' : 'has-error'">
            <label for="city">{{ $t('cityInputLabel', $lang) }}</label>
            <input v-model="customer.city" type="text" class="form-control" :placeholder="$t('cityInputPlaceholder', $lang)" id="city"
                   tabindex="6">
          </div>

          <div class="form-group" :class="validation.state ? '' : 'has-error'">
            <label for="state">{{ $t('stateInputLabel', $lang) }}</label>
            <input v-model="customer.state" type="text" class="form-control" :placeholder="$t('stateInputPlaceholder', $lang)" id="state"
                   tabindex="7">
          </div>
        </div>

        <div class="form-group col-lg-5 col-lg-offset-2">
          <button type="submit" class="btn btn-primary" v-bind:disabled="!validationForm">{{ $t('addCustomerBtnLabel', $lang) }}</button>
        </div>
      </div>



    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'add',
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
      addCustomer: function (e) {
        e.preventDefault()
        let newCustomer = Object.assign({}, this.customer)
        let self = this
        self.add({ newCustomer }).then(() => {
          window.localStorage.setItem('toast-message', self.$t('addCustomerMessage', self.$lang))
          self.$router.push({ path: '/' })
        })

      },
      ...mapActions({
          add: 'addCustomer'
        }
      )
    },
    mounted: function () {
      document.getElementById('first_name').focus()
    },
    computed: {
      validation: function () {
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
      validationForm: function () {
        return this.validation.first_name
          && this.validation.last_name
          && this.validation.email
          && this.validation.phone
          && this.validation.address
          && this.validation.city
          && this.validation.state
      }
    }
  }
</script>
