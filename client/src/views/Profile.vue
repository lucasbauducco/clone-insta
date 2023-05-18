<template>
    <main>
        <div class="container">
            <h1 class="title-account text-center">Mi Perfil</h1>
            <p class="text-account">{{ username }}</p>
            <div class="container container-border profile-background">
                <div class="flex justify-content">
                    <img src="@/assets/img/profile_test.png" alt="profile img">
                    <div class="info-publication flex direction-column justify-content-center align-center">
                        <div class="flex direction-row justify-content-space-evenly">
                            <span class="text-account">Publicaciones</span>
                            <span class="text-account">Seguidos</span>
                            <span class="text-account">Seguidores</span>
                        </div> 
                        <div class="flex direction-row justify-content-space-evenly">
                            <span>100</span>
                            <span>500</span>
                            <span>500</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="description container container-border profile-background">
                <span class="text-account">Description</span>
                <div class="container">
                    {{ description }}
                </div>
            </div>
            <div>
                <ul class="flex justify-content-space-evenly">
                  <li class="account-box-action container-border profile-background">
                    <router-link to="/upload">
                      Editar perfil
                    </router-link>
                  </li>
                  <li class="account-box-action container-border profile-background">
                    <router-link  to="/profile">
                      Compartir Perfil
                    </router-link>
                  </li>
                </ul>
            </div>
            <div class="container profile-background">
                <AccountPost></AccountPost>
            </div>
            <button @click="logout">Salir</button>
        </div>
    </main>
</template>
  
  <script>
    import api from '@/api.js'
    import AccountPost from '@/components/AccountPost.vue'
    export default {
        data(){
            return {
                id: this.$store.getters.loggedId, 
                username: this.$store.getters.username, 
                email: null,
                name:  'Juliet Waltier',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            }
        },
        created(){
            api.get(`/users/${this.$store.getters.loggedId}`).then(response => {
                this.email = response.data.email
                this.name = response.data.username
            })
            api.get(`/muds/user/${this.$store.getters.loggedId}`).then(response => {
                this.posts = response.data
            })
            api.get(`/muds/likes/${this.$store.getters.loggedId}`).then(response => {
                this.postLikes = response.data
            })
        },
        methods:{
            logout(){
                this.$store.commit('setToken', null)
                this.$router.push('/login')
            }
        },
        components:{
            AccountPost
        }
    }
  </script>
  
  <style lang="stylus" scoped>

    main
        background  #EEEEEE
        margin-top 60px
        min-height 100vh
        .title-account
            font-weig20ht bold
            font-weight 700
        .profile-background
            background #d7d7d7   
        .info-publication
            width 80%
            div
                width 100%
                margin 2px 20px
        .description
            margin 20px 0  
            color #aaaaaa
            div 
                margin-top 10px
        .text-account
            color #a0a098
            font-weig20ht bold
            font-weight 700
        .account-box-action
            list-style none
            padding 0.5% 12%
            text-align center
            
            
                

  </style>