<template>
    <main>
        <div class="container">
            <h1 class="title-account text-center"></h1>
            <p class="text-account">{{ name }}</p>
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

                <ul class="account-ul flex justify-content-space-evenly">
                  <li class="account-box-action container-border profile-background">
                    <router-link to="/">
                        Siguiendo
                    </router-link>
                  </li>
                  <li class="account-box-action container-border profile-background">
                    <router-link  to="/">
                      Mensaje
                    </router-link>
                  </li>
                </ul>

            <div class="container profile-background">
                <AccountPost @selected="getid"></AccountPost>
            </div>
        </div>
    </main>
</template>
  
  <script>
    import api from '@/api.js'
    import AccountPost from '@/components/AccountPost.vue'
    export default {
        props:["id"],
        data(){
            return {
                email: null,
                name:  '',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                postLikes: [],
                like: false,
                post: {},
                user: {},
                comments:[],
                comment: {
                    userId: null,
                    postId: null,
                    username: null,
                    comment: "",

                }
            }
        },
        created(){
            api.get(`/users/${this.id}`).then(response => {
                this.email = response.data.email
                this.name = response.data.username
            })
            api.get(`/posts/user/${this.id}`).then(response => {
                this.posts = response.data
            })
            api.get(`/posts/likes/${this.$store.getters.loggedId}`).then(response => {
                this.postLikes = response.data
            })
        },
        methods:{
            getid() {
                return this.id;
            },
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
        .account-ul ul
            margin 0
            padding 0
        .account-box-action
            list-style none
            padding 0.2rem 1rem
            text-align center
            
                

  </style>