import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import './../node_modules/bulma/css/bulma.css'
import Login from './components/Login'
import Produto from './components/Produto'
import Cliente from './components/Cliente'
import Home from './components/Home'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://api-web-christian.herokuapp.com'

Vue.use(VueRouter)

const routes = [
  /*{ path: '*', component: NotFoundComponent },
  { path: '/', component: App, alias: 'principal' }, */
  { path: '/', name: '/home', component: Home },  
  { path: '/login', component: Login },
  { path: '/produto', component: Produto },
  { path: '/cliente', component: Cliente }     
]

const router = new VueRouter({
  /*mode: 'history',*/
  routes 
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')