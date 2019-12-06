<template>
  <div id="home" style="background:gainsboro; width:100%">
    <nav id="nav_geral" class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io" target="_blank">
          <img src="https://www.crm-online.co.uk/wp-content/uploads/2015/02/CRM-Logo1-e1424453030223.png" alt width="112" height="28" />
        </a>
        <div class="navbar-burger burger" data-target="navbarExTransparent">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarTransparent" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href>
            <router-link class="nav-link" to="/home">Home</router-link>
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a id="cadastro" class="navbar-link" href>Cadastros</a>
            <div class="navbar-dropdown is-boxed">
              <a id="botao_nav" class="navbar-item" href>
                <router-link class="nav-link" to="/login">Logins</router-link>
              </a>
              <a id="botao_nav" class="navbar-item" href>
                <router-link class="nav-link" to="/produto">Produtos</router-link>
              </a>
              <a id="botao_nav" class="navbar-item" href>
                <router-link class="nav-link" to="/cliente">Clientes</router-link>
              </a>
            </div>
          </div>
              <a class="navbar-item" href>
                <router-link class="nav-link" to="/venda">Vendas</router-link>
              </a>
              <a class="navbar-item" href>
                <router-link class="nav-link" to="/produtosvendidos">Produtos Vendidos</router-link>
              </a>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style>
#cadastro{
  color: #42b983;

}
#cadastro:hover{
  color: black;

}
#botao_nav
{
  border: 1px solid black;
  border-radius: 50px;
  margin-top: 3%;
  height: 40px;
  margin-left: 3px;
}

#botao_nav:hover
{
  color: purple;
}
#nav_geral
{
  background: gray;

}

</style>