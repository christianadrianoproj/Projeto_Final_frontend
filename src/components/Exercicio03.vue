<template>
  <div id="app" :class="{ 'conteudoDia': pediodoDia, 'conteudoTarde': periodoTarde, 'conteudoNoite': peridoNoite, 'conteudoMadrugada': peridoMadrugada }" >
  <h1>{{ nomeProjeto.toUpperCase() }}</h1>

  <p :title="getmensagem()"> Autor: {{ autor }} </p>

  <p> Ano: {{ ano }} </p>

  <p> Data: {{ data.toLocaleString( ) }} </p>

  <p> Data: {{ data }} </p>

  <p> Hora: {{ hora }} </p>

  <p> manhã (entre 6 e 12 horas) - fundo branco e letras pretas:  {{pediodoDia ? 'Sim' : 'Não'}} </p>
  <p> tarde (entre 12 e 18 horas) - fundo amarelo e letras pretas: {{periodoTarde ? 'Sim' : 'Não'}} </p>
  <p> noite (entre 18 e 23 horas) - fundo deve ser escuro com letras brancas: {{peridoNoite ? 'Sim' : 'Não'}} </p>
  <p> madrugada (entre 0 e 6 horas) - fundo deve ser azul, com letras brancas: {{peridoMadrugada ? 'Sim' : 'Não'}} </p>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      nomeProjeto: 'Meu Projeto',
      autor: 'Christian Adriano',
      ano: 2019,
      data: new Date(),
      hora: null,
      pediodoDia: false,
      periodoTarde: false,
      peridoNoite: false,
      peridoMadrugada: false,
    }
  },

  updated() {
    console.log('atualizou os componentes');
    this.validaPeriodo();
  },  

  mounted() {
    this.validaPeriodo();
  },  

  methods: {
    getmensagem() {
      if (this.autor.startsWith('Christian')) {
        return "Este é o verdadeiro autor"
      }
      return "Este autor é fake"
    },
    validaPeriodo() {
      var now = new Date;
      this.hora = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
      if ((now.getHours() >= 6) && (now.getHours() <= 11)) {
         this.pediodoDia = true;
         this.peridoTarde = false;
         this.peridoNoite = false;
         this.peridoMadrugada = false;
      }
      if ((now.getHours() >= 12) && (now.getHours() <= 17)) {
         this.peridoTarde = true;
         this.pediodoDia = false;
         this.peridoNoite = false;
         this.peridoMadrugada = false;
      }
      if ((now.getHours() >= 18) && (now.getHours() <= 23)) {
         this.peridoNoite = true;
         this.peridoTarde = false;
         this.pediodoDia = false;
         this.peridoMadrugada = false;         
      }
      if ((now.getHours() >= 0) && (now.getHours() <= 5)) {
         this.peridoMadrugada = true;
         this.peridoNoite = false;
         this.peridoTarde = false;
         this.pediodoDia = false;         
      }      
    } 
  }
}
</script>

<style src="./estilo.css"></style>
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
