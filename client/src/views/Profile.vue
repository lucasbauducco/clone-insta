<template>
    <main>
        <h1>Mi Perfil</h1>
        <p>{{ email }}</p>
        <button @click="logout">Salir</button>
    </main>
  </template>
  
  <script>
    import api from '@/api.js'
    export default {
        data(){
            return {
                email: null
            }
        },
        created(){
            api.get('/users/profile').then(response => {
                 this.email = response.data.email
            })
        },methods:{
            logout(){
                this.$store.commit('setToken', null)
                this.$router.push('/login')
            }
        }
    }
  </script>
  
  <style lang="stylus" scoped>
  </style>