<template>
  <main >
    <div class="container">
      <article>
        <h1>Lo más <strong>nuevo</strong></h1>
      </article>
      <div class="grid">
        <figure v-for="post in posts" :key="post.post_id">
          <img :src="'http://192.168.2.199:4000/' + post.source" :alt="posts.title" @click="navigatePost(post)">
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
                <img src="@/assets/img/comment.svg" alt="Logo Comment">
                <span>{{ post.comments}}</span>
              </li>
            </ul>
          </figcaption>
        </figure>
      </div>
    </div>
  </main>
  <router-view></router-view>
</template>

<script>
import api from "@/api.js"
export default {
    data(){
      return{
        posts: [],
        like: false,
        postLikes: [],
        baseUrl: 'http://192.168.2.199:4000/'
      }
    },
    created(){
      api.get('/posts').then(response => {
        this.posts = response.data
      })
      api.get(`/posts/likes/${this.$store.getters.loggedId}`).then(response => {
        this.postLikes = response.data
      })
  },
  methods: {
    likePostDown(post){

      api.post(`/posts/likedown/${post.post_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok){
          post.likes--
          this.postLikes.splice(0, 1)
          this.like = false
        }
      })
    },
    likePost(post) {
      api.post(`/posts/like/${post.post_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok){
          post.likes++
          this.postLikes.push(post.post_id)
          this.like = true
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
        margin 20px 20px
        align-items center
        flex-wrap wrap
        figure 
          margin 10px
          width 33.3333333%
          width calc(33.3333333% - 20px)
          
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