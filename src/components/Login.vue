<template>
  <div class="container login">
    <h1 class="header-page login-title">{{ $t('loginPageTitle', $lang) }}</h1>
    <div class="social-list">
      <a href="javascript:void(0);" @click="loginVk">
        <img src="../assets/vkontakte.png" alt="" class="social-icon">
      </a>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'login',
    data(){
      return {

      }
    },
    methods: {
      loginVk(){
        VK.Auth.login(this.authVk)
      },
      authVk(response){
          if(response && response.status == 'connected'){
            this.$root.$data.loginUser = response.session.user
            window.sessionStorage.setItem('auth', JSON.stringify(response.session.user))
            window.sessionStorage.setItem('token', response.session.sid)
            window.localStorage.setItem('toast-message', `${this.$t('welcomeMessage', this.$lang)} ${response.session.user.first_name}!`)
            this.$router.push({ path: '/' })
          }
      }
    },
    created(){
      if(window.localStorage.getItem('toast-message')){
        var message = window.localStorage.getItem('toast-message')
        window.localStorage.removeItem('toast-message')
        this.$root.$refs.toastr.s(message)
      }
    }
  }
</script>

<style type="text/css">
  .social-list{
    text-align: center;
  }

  .social-icon{
    width: 64px;
  }

  .login-title{
    text-align: center;
    margin-bottom: 20px;
  }
</style>