<template>
  <div>
    <table class="table is-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Data venda</th>
          <th>Valor</th>
          <th>
            <button class="button is-primary is-outlined" @click="adicionar">Incluir Venda</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in vendasByCliente" :key="p.idVenda">
          <td>{{p.idVenda}}</td>
          <td>{{p.cliente.nome}}</td>
          <td>{{p.dataVenda | formatDate}}</td>
          <td class="has-text-right">{{ formatNumber(p.totalVendaLiquida) }}</td>
          <td>
            <button class="button is-success is-outlined" @click="editar(p)">Editar</button>
            <button class="button is-danger is-outlined" @click="excluir(p)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <efetua-venda :show="showForm" :venda="vendaEditar" @close="close" @save="salvar"></efetua-venda>
  </div>
</template>

<script>
import EfetuaVenda from "./EfetuaVenda";
import FormatNumber from "./mixins/FormatNumber";
import axios from "axios";
export default {
  mixins: [FormatNumber],
  components: {
    EfetuaVenda,
    axios
  },
  name: "app",
  data() {
    return {
      vendas: [],
      filtro: "",
      vendaEditar: null,
      showForm: false
    };
  }, 
  mounted() {
    this.carregaVendas();
  },
  methods: { 
    close() {
      this.cancelarVendaIniciada();
      this.showForm = false;
    },
    cancelarVendaIniciada() {
      if (!this.vendaEditar.confirmada) {
        axios
          .post("/venda/cancelaVendaIniciada/" + this.vendaEditar.idVenda)
          .then(response => {
            this.vendas.splice(this.vendas.indexOf(this.vendaEditar), 1);
          })
          .catch(error => {
            alert("Erro no cancelamento da venda");
            console.log(error);
          });
      }
    },
    carregaVendas() {
      axios.get("/venda").then(response => {
        this.vendas = response.data;
      });
    },
    adicionar() {
      (this.vendaEditar = {
        idVenda: null,
        dataVenda: new Date(),
        confirmada: false,
        cliente: null,
        desconto: 0.0,
        valorPago: 0.0,
        itens: [],
        totalVendaLiquida: 0,
        valorTroco: 0,
        totalVenda: 0
      }),
        axios
          .post("/venda/salvaVenda", this.vendaEditar)
          .then(response => {
            this.vendaEditar = response.data;
            this.vendas.push(this.vendaEditar);
          })
          .catch(error => {
            alert("Erro ao iniciar a venda");
            console.log(error);
          });
      this.showForm = true;
    },

    inserir(venda) {
      axios
        .post("/venda/salvaVenda", venda)
        .then(response => {
          this.vendas.push(response.data);
        })
        .catch(error => {
          alert("Erro ao adicionar a venda");
          console.log(error);
        });
    },

    alterar(venda) {
      let idx = this.vendas.findIndex(c => {
        return c.idVenda == venda.idVenda;
      });
      console.log("idx: " + idx);
      if (idx > -1) {
        axios
          .post("/venda/salvaVenda", venda)
          .then(response => {
            venda = response.data;
            this.vendas[idx] = venda;
            this.$set(this.vendas, idx, this.vendas[idx]);
          })
          .catch(error => {
            alert("Erro ao alterar a venda");
            console.log(error);
          });
      }
    },

    editar(venda) {
      this.vendaEditar = Object.assign({}, venda);
      axios.get("/venda/" + venda.idVenda).then(response => {
        this.vendaEditar = response.data;
        this.showForm = true;
      });
    },

    excluir(venda) {
      if (confirm("Excluir registro?")) {
        axios
          .delete("/venda/" + venda.idVenda)
          .then(response => {
            this.vendas.splice(this.vendas.indexOf(venda), 1);
          })
          .catch(error => {
            alert("Erro na exclusão da venda");
            console.log(error);
          });
      }
    },

    salvar(venda) {
      if (this.showForm) {
        if (venda.idVenda == null) {
          this.inserir(venda);
        } else {
          if (venda.cliente == null || venda.totalVenda <= 0) {
            this.cancelarVendaIniciada();
          } else {
            this.alterar(venda);
          }
        }
        this.showForm = false;
      }
    }
  },

  computed: {
    vendasByCliente: function() {
      let lista = this.vendas.filter(c => {
        return c.confirmada == true;
      });

      let lista2 = lista.sort(
        function(a, b) {
          return a.cliente.nome > b.cliente.nome ? 1 : -1;
        }.bind(this)
      );

      return lista2;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
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
