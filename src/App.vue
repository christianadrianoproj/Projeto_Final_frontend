<template>
  <div id="app" style="background:gainsboro; width:100%">
    <nav id="nav_geral" class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io" target="_blank">
          <img
            src="https://www.crm-online.co.uk/wp-content/uploads/2015/02/CRM-Logo1-e1424453030223.png"
            alt
            width="112"
            height="28"
          />
        </a>
        <div class="navbar-burger burger" data-target="navbarExTransparent">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarTransparent" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable" v-if="authenticated">
            <a id="cadastro" class="navbar-link" href>Cadastros</a>
            <div class="navbar-dropdown is-boxed">
                <router-link id="botao_nav" style="margin-top:14px;" class="nav-link" v-if="authenticated" to="/login">Logins</router-link><br>
                <router-link id="botao_nav" style="margin-top:14px;"  class="nav-link" v-if="authenticated" to="/produto">Produtos</router-link><br>
                <router-link id="botao_nav" style="margin-top:14px;"  class="nav-link" v-if="authenticated" to="/cliente">Clientes</router-link><br>
            </div>
          </div>
            <router-link id="nav_button-link"  class="nav-link" v-if="authenticated" to="/venda">Vendas</router-link>
            <router-link
             id="nav_button-link"
              class="nav-link"
              v-if="authenticated"
              to="/produtosvendidos"
            >Produtos Vendidos</router-link>
            <router-link
             id="nav_button-link"
              class="nav-link"
              v-if="authenticated"
              to="/autentica"
              v-on:click.native="logout()"
            >Logout</router-link>
        </div>
      </div>
    </nav>
    <router-view @authenticated="setAuthenticated" /> 
  </div> 
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: false,
      loginVal: {
        login: null,
        senha: null
      }
    };
  },
  created() {
    this.authenticated = false;
    localStorage.authenticated = false;
  },  
  mounted() {
    //console.log("localStorage.authenticated: " + localStorage.authenticated);
    //console.log("authenticated: " + this.authenticated);    
    //this.authenticated = localStorage.authenticated;
    //console.log("localStorage.authenticated: " + localStorage.authenticated);
    //console.log("authenticated: " + this.authenticated); 
        //  alert(this.authenticated);    

    if (!this.authenticated) {
      this.$router.replace({ name: "autentica" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
      localStorage.authenticated = this.authenticated;
    }
  },
  watch: {
    authenticated(newName) {
      localStorage.authenticated = newName;
    }
  }
};
</script>

<style>
#nav_button-link
{
  margin-left: 35px;
  margin-top: 3%;
  color:#42b983;
}
#nav_button-link:hover
{
   margin-left: 35px;
  margin-top: 3%;
  color:black;
}
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  width: 1024px;
  margin: auto;
}
#cadastro {
  color: #42b983;
}
#cadastro:hover {
  color: black;
}
#botao_nav {
  margin-top: 3%;
  height: 5px;
  margin-left: 3px;
}
#botao_nav:hover {
  color: purple;
}
#nav_geral {
  background: gray;
}
</style>