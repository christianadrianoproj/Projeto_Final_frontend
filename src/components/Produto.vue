<template> 
  <div>
    <H2>***** Produtos *****</H2>
    </br>
    <table class="table is-bordered">
        <thead>
          <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th><button class="button is-primary is-outlined" @click="adicionar">Incluir Produto</button></th>
              </tr>
        </thead>
        <tbody>
          <tr v-for="p in produtosOrdenadoPorDescricao" :key="p.idProduto">
              <td> {{p.idProduto}} </td>
              <td> {{p.descricao}} </td>
              <td class="has-text-right"> {{ formatNumber(p.valor) }}</td>
              <td>
                  <button class="button is-success is-outlined" @click="editar(p)">Editar</button>
                  <button class="button is-danger is-outlined" @click="excluir(p)">Excluir</button>
              </td>
          </tr>
        </tbody>
    </table>     
    <cadastro-produto :show="showForm" :produto="produtoEditar" @close="close" @save="salvar" > </cadastro-produto>     
  </div>
</template>

<script>
import CadastroProduto from "./CadastroProduto"
import FormatNumber from "./mixins/FormatNumber"
import axios from 'axios'
export default { 
  mixins: [FormatNumber],    
  components: {
    CadastroProduto, axios
  },  
  name: 'app',
  data () {
    return {
      produtos: [],
      filtro:"",
      produtoEditar: null,
      showForm: false,
    }
  },
  mounted () {
        axios.get('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/produto'). then ( response => {
                    this.produtos = response.data        
        });
  },  
  methods: {     
    close() {
       this.showForm = false;
    },    
    adicionar() {
        this.produtoEditar = {
            idProduto: null,
            descricao: '',
            valor: 0,
        },
        this.showForm = true;
    },  

    inserir (produto) {
        axios.post('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/produto' , produto). then 
                          ( response => {
                                this.produtos.push ( response.data )
                          }). catch ( error => {
                                alert ( 'Erro ao adicionar o produto' )
                                console . log ( error )
                          })
    },

    alterar (produto) {
        let idx = this.produtos.findIndex(c => {
            return c.idProduto == produto.idProduto;
        });
        if (idx > -1) {
            axios.post('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/produto' , produto). then 
                          ( response => {
                                produto = response.data;
                                this.produtos[idx] = produto;
                                this.$set(this.produtos, idx, this.produtos[idx]);
                          }). catch ( error => {
                                alert ( 'Erro ao alterar o produto' )
                                console . log ( error )
                          })            
        }
    },

    editar(produto) {
        this.produtoEditar = Object.assign({}, produto);
        axios.get ('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/produto/' + produto.idProduto ). then ( response => {
              this.produtoEditar = response.data
              this.showForm = true
        })   
    },

    excluir(produto) {
        if (confirm("Excluir registro?")) {      
            axios.delete('https://cors-anywhere.herokuapp.com/https://api-web-christian.herokuapp.com/produto/' + produto.idProduto). then ( response => {
                    this.produtos.splice ( this.produtos.indexOf (produto), 1 )
            }). catch ( error => {
                  alert ( 'Erro na exclusão do produto' )
                  console.log ( error )
            })
        }
    },

    salvar(produto) {
        if (this.showForm) {
            if (produto.idProduto == null) {
                this.inserir(produto);
            }
            else
            {
                this.alterar(produto);
            }
            this.showForm = false;
        }        
    }, 

  },

  computed: {
    produtosOrdenadoPorDescricao: function() {
       let lista =  this.produtos.sort(function( a, b ){
                return parseInt( a.valor ) < parseInt( b.valor ) ? 1 : -1;
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
