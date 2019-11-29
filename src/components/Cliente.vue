<template> 
  <div>
    <table class="table is-bordered">
        <thead>
          <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>CNPJ</th>
              <th><button class="button is-primary is-outlined" @click="adicionar">Incluir Cliente</button></th>
              </tr>
        </thead>
        <tbody>
          <tr v-for="p in clientesOrderPorId" :key="p.idCliente">
              <td> {{p.idCliente}} </td>
              <td> {{p.nome}} </td>
              <td> {{p.cpf}} </td>
              <td> {{p.cnpj}} </td>
              <td>
                  <button class="button is-success is-outlined" @click="editar(p)">Editar</button>
                  <button class="button is-danger is-outlined" @click="excluir(p)">Excluir</button>
              </td>
          </tr>
        </tbody>
    </table>     
    <cadastro-cliente :show="showForm" :cliente="clienteEditar" @close="close" @save="salvar" > </cadastro-cliente>     
  </div>
</template>

<script>
import CadastroCliente from "./CadastroCliente"
import axios from 'axios'
export default {   
  components: {
    CadastroCliente, axios
  },  
  name: 'app',
  data () {
    return {
      clientes: [],
      filtro:"",
      clienteEditar: null,
      showForm: false,
    }
  },
  mounted () {
        axios.get('/cliente'). then ( response => {
                    this.clientes = response.data        
        });
  },  
  methods: {     
    close() {
       this.showForm = false;
    },    
    adicionar() {
        this.clienteEditar = {
            idCliente: null,
            descricao: '',
            valor: 0,
        },
        this.showForm = true;
    },  

    inserir (cliente) {
        axios.post('/cliente' , cliente). then 
                          ( response => {
                                this.clientes.push ( response.data )
                          }). catch ( error => {
                                alert ( 'Erro ao adicionar o cliente' )
                                console . log ( error )
                          })
    },

    alterar (cliente) {
        let idx = this.clientes.findIndex(c => {
            return c.idCliente == cliente.idCliente;
        });
        if (idx > -1) {
            axios.post('/cliente' , cliente). then 
                          ( response => {
                                cliente = response.data;
                                this.clientes[idx] = cliente;
                                this.$set(this.clientes, idx, this.clientes[idx]);
                          }). catch ( error => {
                                alert ( 'Erro ao alterar o cliente' )
                                console . log ( error )
                          })            
        }
    },

    editar(cliente) {
        this.clienteoEditar = Object.assign({}, cliente);
        axios.get ('/cliente/' + cliente.idCliente ). then ( response => {
              this.clienteEditar = response.data
              this.showForm = true
        })   
    },

    excluir(cliente) {
        if (confirm("Excluir registro?")) {      
            axios.delete('/cliente/' + cliente.idCliente). then ( response => {
                    this.clientes.splice ( this.clientes.indexOf (cliente), 1 )
            }). catch ( error => {
                  alert ( 'Erro na exclusão do cliente' )
                  console.log ( error )
            })
        }
    },

    salvar(cliente) {
        if (this.showForm) {
            if (cliente.idCliente == null) {
                this.inserir(cliente);
            }
            else
            {
                this.alterar(cliente);
            }
            this.showForm = false;
        }        
    }, 

  },

  computed: {
    clientesOrderPorId: function() {
       let lista =  this.clientes.sort(function( a, b ){
                return parseInt( a.idCliente ) < parseInt( b.idCliente ) ? 1 : -1;
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
