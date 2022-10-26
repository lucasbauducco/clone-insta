<template>
  <main>
    <section class="full flex">
        <div class="column image">
            <img src="@/assets/img/love-life.jpg" alt="Banner person in heart drawn">
        </div>
        <div class="column flex text">
            <div class="content">
                <h1 class="text-center">Registre su <strong>galería</strong> aquí.</h1>
                <form v-on:submit.prevent="register">
                    <label class="form-label" for="#email">User Name:</label>
                    <input
                        v-model="username"
                        class="form-input"
                        type="text"
                        required
                        placeholder="User Name"
                    >
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
                        required
                        placeholder="********"
                    >
                    <input
                        v-model="password2"
                        class="form-input"
                        type="password"
                        id="password"
                        required
                        placeholder="********"
                    >
                    <input class="form-submit" type="submit" value="Register">
                </form>
                <p class="text-center">ya tienes una cuenta?</p>
                <p class="text-center"><router-link to="/">Ingresar con tu cuenta</router-link></p>
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
            username: "",
            password:"",
            password2:""
        }
    },
    methods: {
        register() {
            if (this.password != this.password2) {
                alert("Las contraseñas no son iguales")
                return 
            }
            api.post('/users/register', {
                email: this.email,
                password: this.password,
                username: this.username
            }).then(result => {
                if(result.data.token){
                    this.$store.commit('setToken', result.data.token)
                    this.$store.commit('setId', result.data.id)
                    this.$store.commit('setUsername', result.data.username)
                    this.$router.push('/');
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .image
        width 50%
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