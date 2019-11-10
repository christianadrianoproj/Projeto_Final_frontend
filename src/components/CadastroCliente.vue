<template>
    <div class="modal" :class="{ 'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de Cliente</p>
                    <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <form @submit.prevent="salvar" v-if="clienteEditar">
                    <section class="modal-card-body">
                        <div class="field">
                                <label class="label">Nome:</label>
                                <input type="text" v-model="clienteEditar.nome" class="input" required autofocus/>
                        </div>

                        <div class="field">
                                <label class="label">Data Nascimento/Data Empresa:</label>
                                <input type="date" v-model="clienteEditar.data" class="input" required/>
                        </div> 

                            <div class="field">
                                <label class="label">CPF:</label>
                                <input type="number" v-model.number="clienteEditar.cpf" class="input"/>
                            </div>
                            <div class="field">
                                <label class="label">Identidade:</label>
                                <input type="number" v-model.number="clienteEditar.identidade" class="input"/>
                            </div>  

                            <div class="field">
                                <label class="label">CPJ:</label>
                                <input type="number" v-model.number="clienteEditar.cnpj" class="input"/>
                            </div>                    
                            <div class="field">
                                <label class="label">inscrição Estadual:</label>
                                <input type="number" v-model.number="clienteEditar.inscricaoEstadual" class="input"/>
                            </div>                     

                    </section>
                    <footer class="modal-card-foot">
                        <input type="submit" class="button is-success" value="Salvar"/>
                        <button class="button" @click="$emit('close')">Cancelar</button>
                    </footer>
            </form>
        </div>     
    </div>
</template>

<script>
export default {    
    props: {
        show: Boolean,
        cliente: Object,                              
    },  
    data() {
        return {
            clienteEditar: null
        }
    },
    mounted() {   
    },
    methods: {
        salvar() {
            this.$emit('save', this.clienteEditar)
        }
    },
    watch: {
        cliente: function(val) {
            this.clienteEditar = val
        } 
    }
}
</script>

<style>

</style>