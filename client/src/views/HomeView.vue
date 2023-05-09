<template>
  <main>
    <div class="home container">
      <article>
        <h1>Lo más <strong>nuevo</strong></h1>
      </article>
      <div class="grid">
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
                      <a href="#">Julieta Del Mount</a>
                      <a  href="#">
                          @UserName
                      </a>
                    </div>
                      <a class="seguir" >Seguir</a>
                  </div>
                  <p class="p-post">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard 
                  dummy text ever since the 1500s, when an unknown 
                  printer took a galley of type and scrambled it to make a type specimen book standards.
                  </p>
                  <div class="mud-body">
                    <img class="img-post" src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTGhCZ-hRCd12WmbfW7Cljqx_aZ2m8fOx59bmy4fbJ1LyUZwLpDcGTZqflRpLzLZ9iN" alt="El Chaltén">
                  </div>
              </div>
            </div>
            <div class="mud-footer">
                <a href="#">
                  <img src="@/assets/img/comment.svg" alt="Logo Comment"/>
                </a>
                <a  href="#">
                  <img src="@/assets/img/teja.png" alt="Logo teja"/>
                </a>
                <a class="seguir" >
                  <img src="@/assets/img/hornero.svg" alt="Logo like"/>
                </a>
            </div>
          </div>
        <figure v-for="post in posts" :key="post.post_id">
          <!--MUDS-->
          <div v-if="post.type==='mud'" class="mud">
            <div class="mud-post">
              <div class="avatar">
                              <a href="#">
                                <img src="@/assets/img/profile_test.png" alt="image profile">
                              </a>
              </div>
              <div class="mud-body">
                  <div class="top">
                    <div>
                      <a href="#">Julieta Del Mount</a>
                      <a  href="#">
                          @UserName
                      </a>
                    </div>
                      <a class="seguir" >Seguir</a>
                  </div>
                  <p class="p-post">{{post.text}}
                  </p>
                  <div v-if="post.source!=''" class="mud-body">
                    <img v-if="post.source!=''" class="img-post" :src="baseUrl+ post.source" alt="IMAGE">
                  </div>
              </div>
            </div>
            <div v-if="post.source===''" class="mud-footer">
                <a href="#">
                  <img src="@/assets/img/comment.svg" alt="Logo Comment"/>
                </a>
                <a  href="#">
                  <img src="@/assets/img/teja.png" alt="Logo teja"/>
                </a>
                <a class="seguir" >
                  <img src="@/assets/img/hornero.svg" alt="Logo like"/>
                </a>
            </div>
          </div>
          <div v-else>
            <img :src="baseUrl+ post.source" :alt="posts.title" @click="navigatePost(post)">
            <figcaption>
              <ul>
                <li v-if="postLikes.includes(post.post_id)"> 
                  <img src="@/assets/img/heart.svg" @click="likePostDown(post)" alt="Heart"/>
                  <span>{{ post.likes}}</span>
                </li>
                <li v-else> 
                  <img src="@/assets/img/hornero.svg" @click="likePost(post)" alt="Hornero"/>
                  <span>{{ post.likes}}</span>
                </li>
                <li> 
                  <img src="@/assets/img/comment.svg" alt="Logo Comment" @click="navigatePost(post)">
                  <span>{{ post.comments}}</span>
                </li>
              </ul>
            </figcaption>
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
        posts: [],
        like: false,
        postLikes: [],
        baseUrl: 'http://192.168.3.151:4000/'
      }
    },
    created(){
      api.get('/posts').then(response => {
        this.posts = response.data
      })
      api.get('/muds').then(response => {
        this.posts = this.posts.concat(response.data)
      })
      api.get(`/posts/likes/${this.$store.getters.loggedId}`).then(response => {
        this.postLikes = response.data
      })
  },
  methods: {
    likePostDown(post){
      if(!store.getters.token) alert('Please Loggin In')
      api.post(`/posts/likedown/${post.post_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok){
          if(this.postLikes.indexOf(post.post_id)!=-1){
            this.postLikes.splice(this.postLikes.indexOf(post.post_id), 1);
            this.like = false
            post.likes--
          }else{
            alert('you stop pushing! :(')
          }
        }
      })
    },
    likePost(post) {
      if(!store.getters.token) alert('Please Loggin In')
      api.post(`/posts/like/${post.post_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok){
          if(this.postLikes.indexOf(post.post_id)==-1){
            this.postLikes.push(post.post_id)
            this.like = true
            post.likes++
          }else{
            alert('you stop pushing! :(')
          }
        }
      })
    },
    navigatePost(post){
      this.$router.push(`/post/${post.post_id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
    main
      background  #EEEEEE
      padding-top 100px
      min-height 100vh
      h1 
        margin 0
      article
        margin-top 30px

      div.grid
        display flex
        margin 20px 0
        align-items center
        flex-wrap wrap
        div.mud-post
          width 100%
          background rgba( 255, 255, 255 , 1)
          display flex
          .avatar
            img
              width 4rem
          .mud-body
            display flex
            flex-direction column
            align-content center
            img
                width 100%
                padding 1rem
            .top
              display flex
              justify-content space-between
              padding 1.2rem 0rem
              a 
                padding 0 0.4rem
            .p-post
              text-align justify
              padding 0 5%
            @media screen and (max-width: 480px)
              .top
                a 
                  font-size 0.8rem
        .mud-footer
          width 100%
          display flex
          background rgba(0,0,0,0.5)
          justify-content space-evenly
          img
            width 2rem
        figure 
          margin 20px 0
          width 100%
          
          position relative
          pointer-events none
          text-align center
          &:hover figcaption
            opacity 1
          img
            display block
            width 100%
            pointer-events all
            cursor pointer
          figcaption
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background-color rgba(0,0,0,0.7)
            display flex
            align-items center
            justify-content center
            opacity 0
            transition opacity ease-out 200ms
            pointer-events none
            cursor pointer
            ul 
              display flex
              margin 0
              padding 0
              width 80%
              justify-content space-around
              li 
                display flex
                align-items center
                justify-content center
                list-style none
                color white
                font-size 40px
                margin-left 10px
                span 
                  font-size 16px
                img
                  width 40px
                  position relative
                  z-index 1

</style>