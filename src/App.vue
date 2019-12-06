<template>
  <div class="card">
     <p class="title" style="position:relative;left:42%;top:20%;">
       Bem Vindo
      </p>
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Entrar</h2>
      <input v-model="teste.login" type="text" id="inputEmail" class="input is-primary" placeholder="Login" required autofocus>
      <input v-model="teste.senha" type="password" id="inputPassword" class="input is-primary" placeholder="Senha" required>
      <button style="margin-left:100px;" class="button is-success" type="submit">Conectar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VueRouter from 'vue-router'
import Vue from 'vue'
export default {
  components:{
    axios,
    VueRouter
  },
  name: 'Login',
  data () {
    return {
      teste: {
        login:null,
        senha:null
      }
    }
  },
  methods: {
    login () {
        axios.post('/login/autentica',this.teste). then ( response => {
                    if(response.data == 'sucesso!'){
                      this.$router.push('/Venda' );
                    }else{
                      alert('senha invalida')
                    }        
        });
    }
  }
}
</script>

<style lang="css">
input
{
  margin: 10px;
}
body {
  background: #605B56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

Let’s look closer at th