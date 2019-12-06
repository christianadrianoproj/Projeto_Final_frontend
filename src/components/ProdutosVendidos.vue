<template> 
  <div style="padding: 10%; margin-left: 15%;">
    <table class="table is-bordered">
        <thead>
          <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Quantidade Vendida</th>
              <th>Soma Valor Unitário</th>
              <th>Total Vendido</th>
              <th></th>
              </tr>
        </thead>
        <tbody>
          <tr v-for="p in produtos" :key="p.idProduto">
              <td> {{p.idProduto}} </td>
              <td> {{p.descricaoProduto}} </td>
              <td> {{p.quantidadeVendido}} </td>
              <td class="has-text-right"> {{ formatNumber(p.totalProduto) }}</td>
              <td class="has-text-right"> {{ formatNumber(p.totalVendido) }}</td>              
              <td>
              </td>
          </tr>
        </tbody>
    </table>        
  </div>
</template>

<script>
import FormatNumber from "./mixins/FormatNumber"
import axios from 'axios'
export default { 
  mixins: [FormatNumber],    
  components: {
    axios
  },   
  name: 'app',
  data () {
    return {
      produtos: [],
    }
  },
  mounted () {
        axios.get('/produto/totaisVendidos'). then ( response => {
                    this.produtos = response.data        
        });
  },  
  methods: {
  

  },

  computed: {     
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
a:hover
{
  color: black;
}

</style>
