<template>
  <main>
    <section class="full flex">
        <div class="column image">
            <img src="@/assets/img/login-baner.jpg" alt="">
        </div>
        <div class="column flex text">
            <div class="content">
                <h1 class="text-center">Registre su <strong>galería</strong> aquí.</h1>
                <form v-on:submit.prevent="register">
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
                password: this.password
            }).then(result => {
                console.log(result.data)
                if(result.data.token){
                    console.log(result.data.token)
                    this.$store.commit('setToken', result.data.token)
                    this.$router.push('/');
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
            display block
            height 100%
            object-fit cover
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