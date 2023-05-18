<template>
  <main>
    <section class="full flex">
        <div class="column image">
            <img src="@/assets/img/banner.jpg" alt="baner">
        </div>
        <div class="column flex text">
            <div class="content">
                <h1 class="text-center">Entrar a tu <strong>galería</strong>.</h1>
                <form v-on:submit.prevent="login">
                    <p v-show="error">{{error}}</p>
                    <label class="form-label" for="#email">Email:</label>
                    <input
                        v-model="email"
                        class="form-input"
                        type="email"
                        id="email"
                        required
                        placeholder="E-mail"
                    >
                    <label class="form-label" for="#password">Password:</label>
                    <input
                        v-model="password"
                        class="form-input"
                        type="password"
                        id="password"
                        placeholder="********"
                    >
                    <input class="form-submit" type="submit" value="Login">
                </form>
                <p class="text-center">o también puedes</p>
                <p class="text-center"><router-link to="/register">Crear tu cuenta</router-link></p>
            </div>
            <ul class="social">
                <li><a href="#"><i class="lab la-facebook-square"></i></a></li>
                <li><a href="#"><i class="lab la-instagram"></i></a></li>
                <li><a href="#"><i class="lab la-patreon"></i></a></li>
            </ul>
        </div>
    </section>
  </main>
</template>

<script>
import api from '@/api'
export default {
    components:{

    },
    data(){
        return{
            email:"",
            password:"",
            error: false
        }
    },
    methods: {
        login() {
            api.post('/users/login', {
                email: this.email,
                password: this.password
            }).then(result => {
                console.log(result)
                if(result.data.error)
                    this.error = result.data.error
                if(result.data.token){
                    this.$store.commit('setToken', result.data.token)
                    this.$store.commit('setId', result.data.id)
                    this.$store.commit('setUsername', result.data.username)
                    this.$store.commit('setUsername', result.data.name)
                    this.$store.commit('setUsername', result.data.lastname)
                    api.defaults.headers['Authorization'] = this.$store.getters.token
                    console.log(result.data.username)
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .image
        width 60%
        flex-basis 60%
        position relative
        img 
            width 100%
            padding-top 10%
            display block
            height 100%
            object-fit cover
            -webkit-filter brightness(70%)
            filter brightness(70%)
        p 
            position absolute
            bottom 30px
            left 30px
            color white
            font-weight 600

    .text
        align-self center
        flex-basis 40%
        align-items: center
        justify-content: center
        .content
            width: 320px
    ul.social
        position absolute
        bottom 30px
        margin 0
        padding 0
        li
            display inline-block
            margin 0 10px
            i
                font-size 40px
                font-weight 300
    .error 
        margin 1rem 0 0
        color #ff4a96
</style>