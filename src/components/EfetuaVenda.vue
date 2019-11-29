<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Venda</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <form v-if="vendaEditar">
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Data Venda:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                    {{vendaEditar.dataVenda | formatDate}}
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Cliente:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <multiselect
                    v-model="vendaEditar.cliente"
                    :multiple="false"
                    :options="clientesByNome"
                    track-by="idCliente"
                    label="nome"
                    required
                  ></multiselect>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Produto:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <multiselect
                    v-model="Item.produto"
                    :multiple="false"
                    :options="podutosByDescricao"
                    track-by="idProduto"
                    label="descricao"
                    required
                  ></multiselect>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Quantidade:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input type="number" v-model.number="Item.quantidade" class="input" required />
                </div>
              </div>
              <button class="button is-primary is-outlined" @click="adicionarItem(Item)">Incluir Item</button>
            </div>
          </div>
          <table class="table is-bordered">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>                  
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in vendaEditar.itens" :key="p.idVendaItem">
                <td>{{p.produto.descricao}}</td>
                <td>{{p.quantidade}}</td>
                <td class="has-text-right">{{ formatNumber(p.valorUnitario) }}</td>
                <td>
                  <button class="button is-danger is-outlined" @click="excluirItem(p)">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Total Venda:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                    {{formatNumber(vendaEditar.totalVenda) }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Desconto:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input type="number" v-model.number="vendaEditar.desconto" class="input" required />
                </div>
              </div>
            </div>
            <div class="field-label">
                <label class="label">Pago:</label>
            </div>  
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input type="number" v-model.number="vendaEditar.valorPago" class="input" required />
                </div>
              </div>
            </div>  
            <div class="field-label">
                <label class="label">Troco:</label>
            </div>  
            <div class="field-body">
              <div class="field">
                <div class="control">
                  {{formatNumber(vendaEditar.valorTroco) }}
                </div>
              </div>
            </div>                                 
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="salvar()">Salvar</button>         
          <button class="button" @click="$emit('close')">Cancelar</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import FormatNumber from "./mixins/FormatNumber";
import axios from "axios";
export default {
  mixins: [FormatNumber],
  components: {
    Multiselect,
    axios
  },
  props: {
    show: Boolean,
    venda: Object
  },
  data() {
    return {
      vendaEditar: null,
      clientes: null,
      produtos: null,      
      Item:null,
    };
  },
  mounted() {
    axios
      .get("/produto")
      .then(response => {
        this.produtos = response.data;
      })
      .catch(error => {
        alert("Erro de comunicação com o servidor");
        console.log(error);
      });
    axios
      .get("/cliente")
      .then(response => {
        this.clientes = response.data;
      })
      .catch(error => {
        alert("Erro de comunicação com o servidor");
        console.log(error);
      });
      
      this.iniciaNovoItem();
  },
  methods: {
    validaCampos() {
      let retorno = true;
      if (this.vendaEditar.cliente == null) {
        retorno = false;
        alert("Informe o Cliente!");
      }
      if((retorno) && (this.vendaEditar.itens.length < 1)) {
        retorno = false;
        alert("Informe pelo menos um Item!");
      }      
      return retorno;
    },
    salvar() {
      if (this.validaCampos()) {
          this.vendaEditar.confirmada = true;
          this.$emit("save", this.vendaEditar);
      }
    },  
    iniciaNovoItem() {
      this.Item =  {
        idVendaItem: null,
        quantidade: 1,
        valorUnitario: 0,
        produto:null,
      }
    },

    adicionarItem(VendaItem) {
        VendaItem.valorUnitario = VendaItem.produto.valor;
        axios.post('/venda/atualizaCliente', this.vendaEditar). then 
                          ( response => {
                               this.vendaEditar = response.data;
                          }). catch ( error => {
                                alert ( 'Erro ao atualizar venda' )
                                console . log ( error )
                          });        
        axios.post('/venda/adicionaItem/'+this.vendaEditar.idVenda, VendaItem). then 
                          ( response => {
                               this.vendaEditar = response.data;
                          }). catch ( error => {
                                alert ( 'Erro ao adicionar o Item' )
                                console . log ( error )
                          });
        this.iniciaNovoItem();
    },

    excluirItem(VendaItem) {
        if (confirm("Excluir registro?")) {              
            axios.post('/venda/deleteItem/' + this.vendaEditar.idVenda, VendaItem). then ( response => {
                    this.vendaEditar = response.data;
            }). catch ( error => {
                  alert ( 'Erro na exclusão do Item' )
                  console.log ( error )
            });
        }
        else
        {
          this.vendaEditar.itens = this.vendaEditar.itens;

        }
    },  
    
  },
  computed: {
    podutosByDescricao: function() {
      let lista =  this.produtos.sort(function( a, b ){
                return  a.descricao > b.descricao ? 1 : -1;
       }.bind(this));
      return lista;
    },
    clientesByNome: function() {
      let lista =  this.clientes.sort(function( a, b ){
                return  a.nome > b.nome ? 1 : -1;
       }.bind(this));

      return lista;
    },    
  },  
  watch: {
    venda: function(val) {
      this.vendaEditar = val;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>