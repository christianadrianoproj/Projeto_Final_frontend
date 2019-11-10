<template>
    <div class="modal" :class="{ 'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de Produto</p>
                    <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <form @submit.prevent="salvar" v-if="produtoEditar">
                    <section class="modal-card-body">
                        <div class="field">
                                <label class="label">Descrição:</label>
                                <input type="text" v-model="produtoEditar.descricao" class="input" required autofocus/>
                        </div>
                        <div class="field">
                                <label class="label">Valor R$:</label>
                                <input type="number" v-model.number="produtoEditar.valor" class="input" required/>
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
        produto: Object,                              
    },  
    data() {
        return {
            produtoEditar: null
        }
    },
    mounted() {   
    },
    methods: {
        salvar() {
            this.$emit('save', this.produtoEditar)
        }
    },
    watch: {
        produto: function(val) {
            this.produtoEditar = val
        } 
    }
}
</script>

<style>

</style>