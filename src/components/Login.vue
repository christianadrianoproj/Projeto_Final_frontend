<template> 
  <div>
    <H2>***** Logins *****</H2>
    </br>
    <table class="table is-bordered">
        <thead>
          <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Nome</th>
              <th>Privilegico</th>
              <th><button class="button is-primary is-outlined" @click="adicionar">Incluir Login</button></th>
              </tr>
        </thead>
        <tbody>
          <tr v-for="p in loginsOrdenadoPorNome" :key="p.id">
              <td> {{p.id}} </td>
              <td> {{p.login}} </td>
              <td> {{p.nome}} </td>
              <td> {{p.privilegio}} </td>
              <td>
                  <button class="button is-success is-outlined" @click="editar(p)">Editar</button>
                  <button class="button is-danger is-outlined" @click="excluir(p)">Excluir</button>
              </td>
          </tr>
        </tbody>
    </table>     
    <cadastro-login :show="showForm" :login="loginEditar" @close="close" @save="salvar" > </cadastro-login>     
  </div>
</template>

<script>
import CadastroLogin from "./CadastroLogin"
import axios from 'axios'
export default { 
  components: {
    CadastroLogin, axios
  },  
  name: 'app',
  data () {
    return {
      logins: [],
      filtro:"",
      loginEditar: null,
      showForm: false,
    }
  },
  mounted () {
        axios.get('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/login'). then ( response => {
                    this.logins = response.data        
        });
  },  
  methods: {     
    close() {
       this.showForm = false;
    },    
    adicionar() {
        this.loginEditar = {
            id: null,
            nome: '',
            login: '',
            senha: '',
            privilegio: '',
        },
        this.showForm = true;
    },  

    inserir (login) {
        axios.post('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/login' , login). then 
                          ( response => {
                                this.logins.push ( response.data )
                          }). catch ( error => {
                                alert ( 'Erro ao adicionar o login' )
                                console . log ( error )
                          })
    },

    alterar (login) {
        let idx = this.logins.findIndex(c => {
            return c.id == login.id;
        });
        if (idx > -1) {
            axios.post('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/login' , login). then 
                          ( response => {
                                login = response.data;
                                this.logins[idx] = login;
                                this.$set(this.logins, idx, this.logins[idx]);
                          }). catch ( error => {
                                alert ( 'Erro ao alterar o login' )
                                console . log ( error )
                          })            
        }
    },

    editar(login) {
        this.loginEditar = Object.assign({}, login);
        axios.get ('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/login/' + login.id ). then ( response => {
              this.loginEditar = response.data
              this.showForm = true
        })   
    },

    excluir(login) {
        if (confirm("Excluir registro?")) {      
            axios.delete('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/login/' + login.id). then ( response => {
                    this.logins.splice ( this.logins.indexOf (login), 1 )
            }). catch ( error => {
                  alert ( 'Erro na exclusão do login' )
                  console.log ( error )
            })
        }
    },

    salvar(login) {
        if (this.showForm) {
            if (login.id == null) {
                this.inserir(login);
            }
            else
            {
                this.alterar(login);
            }
            this.showForm = false;
        }        
    }, 

  },

  computed: {
    loginsOrdenadoPorNome: function() {
       let lista =  this.logins.sort(function( a, b ){
                return parseInt( a.nome ) < parseInt( b.nome ) ? 1 : -1;
       }.bind(this));
       return lista;
    },      
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
