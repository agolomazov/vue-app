<template>
  <div class="add container">
    <h1 class="page-header">{{ $t('addCustomerLink', $lang) }}</h1>
    <form v-on:submit="addCustomer">

      <div class="row">

        <div class="well col-lg-5">
          <h4>{{ $t('customerInfoFieldsetTitle', $lang) }}</h4>
          <div class="form-group">
            <label for="first_name">{{ $t('firstNameInputLabel', $lang) }}</label>
            <input v-model="customer.first_name" type="text" class="form-control" placeholder="First Name"
                   id="first_name" tabindex="1">
          </div>
          <div class="form-group">
            <label for="last_name">{{ $t('lastNameInputLabel', $lang) }}</label>
            <input v-model="customer.last_name" type="text" class="form-control" placeholder="Last Name" id="last_name"
                   tabindex="2">
          </div>
        </div>

        <div class="well col-lg-5 col-lg-offset-2">
          <h4>{{ $t('customerContactFieldSetTitle', $lang) }}</h4>
          <div class="form-group">
            <label for="email">{{ $t('emailInputLabel', $lang) }}</label>
            <input v-model="customer.email" type="email" class="form-control" placeholder="example@mail.ru" id="email"
                   tabindex="3">
          </div>
          <div class="form-group">
            <label for="phone">{{ $t('phoneInputLabel', $lang) }}</label>
            <input v-model="customer.phone" type="text"
                   v-mask="'+7(###)-###-##-##'"
                   class="form-control" placeholder="+79818554646" id="phone"
                   tabindex="4">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="well col-lg-5">
          <h4>{{ $t('locationFieldsSetTitle', $lang) }}</h4>
          <div class="form-group">
            <label for="address">{{ $t('addressInputLabel', $lang) }}</label>
            <input v-model="customer.address" type="text" class="form-control" placeholder="Your address" id="address"
                   tabindex="5">
          </div>
          <div class="form-group">
            <label for="city">{{ $t('cityInputLabel', $lang) }}</label>
            <input v-model="customer.city" type="text" class="form-control" placeholder="City name" id="city"
                   tabindex="6">
          </div>

          <div class="form-group">
            <label for="state">{{ $t('stateInputLabel', $lang) }}</label>
            <input v-model="customer.state" type="text" class="form-control" placeholder="State title" id="state"
                   tabindex="7">
          </div>
        </div>

        <div class="form-group col-lg-5 col-lg-offset-2">
          <button type="submit" class="btn btn-primary" v-bind:disabled="disabledSubmit">{{ $t('addCustomerBtnLabel', $lang) }}</button>
        </div>
      </div>



    </form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

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
        this.add({ newCustomer })
        window.localStorage.setItem('toast-message', 'Данные о покупателе успешно добавлены в базу')
        this.$router.push({ path: '/' })
      },
      validateEmail: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(value)
      },
      isEmpty: function (value) {
        return value.trim() !== ''
      },
      validatePhone: function (value) {
        var re = /^((\+7)|8)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2}[-. ]?){2}$/
        return re.test(value)
      },
      ...mapMutations({
          add: 'addCustomer'
        }
      )
    },
    mounted: function () {
      document.getElementById('first_name').focus()
    },
    computed: {
      disabledSubmit: function () {
        return !this.isEmpty(this.customer.first_name) || !this.isEmpty(this.customer.last_name) || !this.validateEmail(this.customer.email) || !this.validatePhone(this.customer.phone) || !this.isEmpty(this.customer.address) || !this.isEmpty(this.customer.city) || !this.isEmpty(this.customer.state)
      }
    }
  }
</script>
