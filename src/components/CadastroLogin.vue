<template>
    <div class="modal" :class="{ 'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de Login</p>
                    <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <form @submit.prevent="salvar" v-if="loginEditar">
                    <section class="modal-card-body">
                        <div class="field">
                                <label class="label">Nome:</label>
                                <input type="text" v-model="loginEditar.nome" class="input" required autofocus/>
                        </div>
                        <div class="field">
                                <label class="label">login:</label>
                                <input type="text" v-model="loginEditar.login" class="input" required/>
                        </div>
                        <div class="field">
                                <label class="label">Senha:</label>
                                <input type="password" v-model="loginEditar.senha" class="input" required/>
                        </div>                    
                        <div class="field">
                                <label class="label">Privilegio:</label>
                                <input type="text" v-model="loginEditar.privilegio" class="input" required/>
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
        login: Object,                              
    },  
    data() {
        return {
            loginEditar: null
        }
    },
    mounted() {   
    },
    methods: {
        salvar() {
            this.$emit('save', this.loginEditar)
        }
    },
    watch: {
        login: function(val) {
            this.loginEditar = val
        } 
    }
}
</script>

<style>

</style>