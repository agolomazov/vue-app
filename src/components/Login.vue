<template>
  <div class="container login">
    <h1 class="header-page">Login page</h1>
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
            window.localStorage.setItem('auth', JSON.stringify(response.session.user))
            window.sessionStorage.setItem('token', response.session.sid)
            window.localStorage.setItem('toast-message', `Поздравляю, ${response.session.user.first_name}! Вы успешно авторизировались`)
            this.$router.push({ path: '/' })
          }
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
</style>