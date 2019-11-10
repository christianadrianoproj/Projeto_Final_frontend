<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <label for="name">Informe uma data:</label>
     <input type="date" id="txtData" v-model="DataInformada" autofocus  maxlength="30" placeholder="" required/></br>
     <button  @click="converteDataParaExtenso()">Mostrar data por extenso</button>
     <p v-if="dataConvertidaParaExtenso()"> Data Informada: {{ DataPorExtenso }} </p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Exercício de Data',
      DataInformada: "",
      DataPorExtenso: "",
      Meses: [
        {id: 1, nome:"Janeiro"},
        {id: 2, nome:"Fevereiro"},
        {id: 3, nome:"Março"},
        {id: 4, nome:"Abril"},
        {id: 5, nome:"Maio"},
        {id: 6, nome:"Junho"},
        {id: 7, nome:"Julho"},
        {id: 8, nome:"Agosto"},
        {id: 9, nome:"Setembro"},
        {id: 10, nome:"Outubro"},
        {id: 11, nome:"Novembro"},
        {id: 12, nome:"Dezembro"}             
      ],
    }
  },
  methods: { 
    dataConvertidaParaExtenso() {
        return this.DataPorExtenso.length > 0; 
    },  
    converteDataParaExtenso() {
       var data = this.DataInformada.split('-');
       var indexMes = parseInt(data[1]);
       this.DataPorExtenso = data[2] + " de " + this.Meses[indexMes-1].nome + " de " + data[0];
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
