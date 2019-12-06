import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import './../node_modules/bulma/css/bulma.css'
import Login from './components/Login'
import Produto from './components/Produto'
import Cliente from './components/Cliente'
import Venda from './components/Venda'
import Home from './components/Principal'
import ProdutosVendidos from './components/ProdutosVendidos'
import moment from 'moment'

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});
Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
  }
});
axios.defaults.baseURL = 'https://api-web-christian.herokuapp.com'
/*axios.defaults.baseURL = 'http://localhost:8080'*/

Vue.use(VueRouter)

const routes = [
  /*{ path: '*', component: NotFoundComponent },
  { path: '/', component: App, alias: 'principal' }, */
  { path: '/',  component: App },
  {path:'/home',name:'Home',component:Home},  
  { path: '/login', component: Login },
  { path: '/produto', component: Produto },
  { path: '/cliente', component: Cliente },   
  { path: '/produtosvendidos', component: ProdutosVendidos },     
  { path: '/venda', component: Venda }     
]

const router = new VueRouter({
  mode: "history",
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')