<template>
  <div id="app">
    <p>Tabela de conversão entre graus Celsius e Fahrenheit</p>
    <button  @click="preencheTemperaturas()">Buscar Temperaturas</button>
    <table>
        <tr>
            <th>Temperatura Celsius</th>
            <th>Temperatura Fahrenheit</th>
        </tr>
        <tr v-for="elem in Temperaturas" :key="elem">
            <td>{{elem.temperaturaCelsius}}</td>
            <td>{{elem.temperaturaFahrenheit}}</td>
        </tr>
    </table>   
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      Temperaturas: [],      
    }
  },
  methods: {
    calculaTemperaturaFahrenheit(temperaturasCelsius) {
      var valor = Number(temperaturasCelsius);
      return (valor * 9/5)+32;     
    },
    preencheTemperaturas() {
        let i = -40;
        let f = 0;
        var elem = null;
        while (i <= 100) {
          f = this.calculaTemperaturaFahrenheit(i);
          elem = {temperaturaCelsius: i, temperaturaFahrenheit: f};
          this.Temperaturas.push(elem);
          i = i + 10;          
        }
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
