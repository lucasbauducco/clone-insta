<template>
  <main>
    <div class="container">
      <article>
        <h1>Lo más <strong>nuevo</strong></h1>
      </article>
      <div class="grid">
        <figure v-for="mud in muds" :key="mud.mud_id">      
        <div class="mud">
          <div class="mud-post">
              <div class="avatar">
                  <a href="#">
                      <img src="@/assets/img/profile_test.png" alt="image profile">
                  </a>
              </div>
              <div class="mud-body">
                <div class="top">
                    <div>
                      <a href="#">{{ name }} {{ lastname }}</a>
                      <a  href="#">
                          {{ username }}
                      </a>
                    </div>
                      <a class="seguir" >Seguir</a>
                </div>
                <div class="p-post">
                      <p>{{ mud.description }}</p>
                </div>
                <div class="img">
                  <img v-if="mud.source!=''" class="img-post" :src="baseUrl+ mud.source" alt="IMAGE">
                </div>
              </div>
          </div>
          <div class="mud-footer">
                  <a href="#" @click="navigatePost(mud)">
                    <img src="@/assets/img/comment.svg" alt="Logo Comment"/>
                  </a>
                  <a  href="#">
                    <img src="@/assets/img/teja.png" alt="Logo teja"/>
                  </a>
                  <a class="follow" >
                    <a v-if="mudLikes.includes(mud.mud_id)" @click="likeMudDown(mud)" href="#">
                            <img src="@/assets/img/heart.svg" alt="Heart"/>
                            <span >{{mud.likes}}</span>
                    </a>
                    <a v-else @click="likeMud(mud)" href="#">
                        <img src="@/assets/img/hornero.svg" alt="Hornero"/>
                        <span>{{mud.likes}} Me gusta</span>
                    </a>
                  </a>
              </div>
        </div>
      </figure>
      </div>
    </div>
  </main>
  <router-view></router-view>
</template>

<script>
import api from "@/api.js"
import store from '@/store'
export default {
    data(){
      return{
        username: this.$store.getters.username,
        name: this.$store.getters.name,
        lastname: this.$store.getters.lastname,
        muds: [],
        like: false,
        mudLikes: [],
        baseUrl: 'http://192.168.3.186:4000/'
      }
    },
    created(){
      api.get('/muds').then(response => {
        this.muds = this.muds.concat(response.data)
      })
      api.get(`/muds/likes/${this.$store.getters.loggedId}`).then(response => {
        this.mudLikes = response.data
      })
  },
  methods: {
    likeMudDown(mud){
      if(!store.getters.token) alert('Please Loggin In')
      api.post(`/muds/likedown/${mud.mud_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok){
          if(this.mudLikes.indexOf(mud.mud_id)!=-1){
            this.mudLikes.splice(this.mudLikes.indexOf(mud.mud_id), 1);
            this.like = false
            mud.likes--
          }else{
            alert('you stop pushing! :(')
          }
        }
      })
    },
    likeMud(mud) {
      if(!store.getters.token) alert('Please Loggin In')
      api.post(`/muds/like/${mud.mud_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok){
          if(this.mudLikes.indexOf(mud.mud_id)==-1){
            this.mudLikes.push(mud.mud_id)
            this.like = true
            mud.likes++
          }else{
            alert('you stop pushing! :(')
          }
        }
      })
    },
    navigatePost(mud){
      this.$router.push(`/mud/${mud.mud_id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.grid
  display flex
  flex-direction column
  align-items center
  figure
    background-color #eeeeee
    padding 10px
  .mud
   .mud-post
      display flex
    .mud-body
      .top
        display flex
        justify-content flex-end
        align-items center
        padding 25px 5px 25px
      .p-post 
        p
          font-size 1rem
          width 28rem
          padding 1px
          /* Control de la altura con base en el texto del div*/
          height: auto;
          word-wrap: break-word;
      .seguir
        padding 0 10px 0 20px
      .img
        .img-post
          width 33.333333vw
    .mud-footer
      display flex
      justify-content flex-end
      a
        padding 10px
      img 
        width 20px




</style>