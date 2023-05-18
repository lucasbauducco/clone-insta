<template>
  <div class="app">
    <header>
      <nav>
        <div class="container">
          <div class="flex align align-center">
            <div class="column">
                <div class="logo">
                  <router-link tag="button" to="/"><img src="@/assets/img/Miproyecto.png" alt="logo artigram"></router-link>
                </div>
              <template v-if="details">
                <form>
                    <div class="search-box">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" width="22px" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
                      <input
                        type="text"
                        placeholder="Buscar"
                      >
                    </div>
                </form>
              </template>
            </div>
            <div class="column">
              <template v-if="details">
                <ul class="user-actions" v-if= "logged">

                  <li>
                    <router-link to="/upload">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" width="22px" viewBox="0 0 24 24"><title>landslide</title><path d="M15.47 13.79L12.89 12.76L6 15.05L2 13.5V15.61L6 16.95L15.47 13.79M10.57 11.42L8 8H2V11.61L6 12.95L10.57 11.42M6 19.05L2 17.72V22H22L17.03 15.38L6 19.05M17 6V1L12 0L9 2V6L12 8L17 6M18.5 7L16 9V12L18.5 14L23 12V8L18.5 7Z" /></svg>
                    </router-link>
                  </li>
                  <li>
                    <router-link  to="/profile">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" width="22px" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>
                    </router-link>
                  </li>
                  <li>
                    <a href="#" @click="logout()">
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" width="22px" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 64l224 0 0 9.8c0 39-23.7 74-59.9 88.4C167.6 186.5 128 245 128 310.2l0 73.8s0 0 0 0H64V64zm288 0l224 0V384H508.3l-3.7-4.5-75.2-90.2c-9.1-10.9-22.6-17.3-36.9-17.3l-71.1 0-41-63.1c-.3-.5-.6-1-1-1.4c44.7-29 72.5-79 72.5-133.6l0-9.8zm73 320H379.2l42.7 64H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48V400c0 26.5 21.5 48 48 48H308.2l33.2 49.8c9.8 14.7 29.7 18.7 44.4 8.9s18.7-29.7 8.9-44.4L310.5 336l74.6 0 40 48zm-159.5 0H192s0 0 0 0l0-73.8c0-10.2 1.6-20.1 4.7-29.5L265.5 384zM192 128c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
                    </a>
                  </li>
                </ul>
                <router-link tag="button" to="/login" v-if= "!logged">Crea tu galería</router-link>
              </template>
            </div>
            
          </div>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>
<script>
  export default {
    data(){
      return{
        details: true,
        logged: false
      }
    },
    created(){
      this.checkRoute(this.$route)
    },
    watch:{
      '$route'(to){
        this.checkRoute(to)
      }
    },
    methods: {
      checkRoute(to){
        const routes =['/login', '/register']
        if(routes.includes(to.path))
          this.details = false
        else 
          this.details = true

        if(this.$store.getters.token)
          this.logged = true
        else
          this.logged  = false
      },
      logout(){
          this.$store.commit('setToken', null)
          this.$router.push('/login')
      }

    }
  }
</script>
<style lang="stylus" src="./assets/styles/main.styl" />

