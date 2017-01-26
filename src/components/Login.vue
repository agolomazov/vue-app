<template>
  <div class="container login">
    <h1 class="header-page login-title">{{ $t('loginPageTitle', $lang) }}</h1>
    <div class="social-list">
      <a href="javascript:void(0);" @click="loginVk">
        <img src="../assets/vkontakte.png" alt="" class="social-icon">
      </a>
      <a href="javascript:void(0);" @click="loginFB">
        <img src="../assets/facebook.png" alt="" class="social-icon">
      </a>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'login',
    data(){
      return {}
    },
    methods: {
      loginVk(){
        VK.Auth.login(this.authVk)
      },
      authVk(response){
        if (response && response.status == 'connected') {
          this.$root.$data.loginUser = response.session.user
          this.$root.$data.loginUser.type = 'vkontakte'
          window.sessionStorage.setItem('auth', JSON.stringify(response.session.user))
          window.sessionStorage.setItem('token', response.session.sid)
          window.localStorage.setItem('toast-message', `${this.$t('welcomeMessage', this.$lang)} ${response.session.user.first_name}!`)
          this.$router.push({path: '/'})
        }
      },
      loginFB(){
        FB.getLoginStatus(this.authFB)
      },
      authFB(response){
        var self = this
        if (response.status !== "connected") {
          FB.login(function (requestAnswer) {
            window.sessionStorage.setItem('token', requestAnswer.authResponse.accessToken)
            this.$root.$data.loginUser.type = 'facebook'
          })
        }

        FB.api('/me', function (requestAnswer) {
            FB.api('/' + requestAnswer.id, 'GET', {"fields": "id, name, first_name, last_name, email"}, function (requestData) {
              if(requestData && !requestData.error){
                self.$root.$data.loginUser = requestData
                window.sessionStorage.setItem('token', requestData.id)
                window.sessionStorage.setItem('auth', JSON.stringify(requestData))
                window.localStorage.setItem('toast-message', `${self.$t('welcomeMessage', self.$lang)} ${requestData.first_name}!`)
                self.$router.push({path: '/'})
              }
            })
          })



      }
    },
    created(){
      if (window.localStorage.getItem('toast-message')) {
        var message = window.localStorage.getItem('toast-message')
        window.localStorage.removeItem('toast-message')
        this.$root.$refs.toastr.s(message)
      }
    }
  }
</script>

<style type="text/css">
  .social-list {
    text-align: center;
  }

  .social-icon {
    width: 64px;
  }

  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
</style>