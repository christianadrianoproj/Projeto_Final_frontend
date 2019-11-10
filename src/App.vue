<template>
  <div id="home">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io" target="_blank">
          <img src="https://bulma.io/images/bulma-logo.png" alt width="112" height="28" />
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
            <a class="navbar-link" href>Cadastros</a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href>
                <router-link class="nav-link" to="/login">Logins</router-link>
              </a>
              <a class="navbar-item" href>
                <router-link class="nav-link" to="/produto">Produtos</router-link>
              </a>
              <a class="navbar-item" href>
                <router-link class="nav-link" to="/cliente">Clientes</router-link>
              </a>
            </div>
          </div>
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
#app {
}
</style>