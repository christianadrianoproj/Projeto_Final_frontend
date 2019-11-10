<template>
    <div>
        <table>
            <tr>
                <th>Masculino</th>
                <th>Feminino</th>
            </tr>
            <tr v-for="t in totais" :key="t.masculino">
                <td>{{t.masculino}}</td>
                <td>{{t.feminino}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        generos: {
            type: Array, 
            default: [{masculino: 0, feminino: 0}]
        },
    },
    data() {
        return {
            totais: [{masculino: 0, feminino: 0}]
        }
    },
    mounted() {
        this.calcularQuantidades()
    },
    methods: {
        calcularQuantidades() {
            this.totais = [];
            var totmas = 0;
            var totfem = 0;
            this.generos.forEach(element => {
                if ((element.genero.startsWith("M")) || (element.genero.startsWith("m"))) {
                  totmas  = totmas + 1    
                }
                else {
                   totfem = totfem + 1 
                }  
            });
            var elem = {masculino: totmas, feminino: totfem};
            this.totais.push(elem);
        }, 
    },
    watch: {
        generos: function() {
            this.calcularQuantidades()
        },          
    }
}
</script>

<style>

</style>