<template>
  <main >
    <div class="container">
      <article>
        <h1>Lo más <strong>nuevo</strong></h1>
      </article>
      <div class="grid">
        <figure v-for="post in posts">
          <img :src="baseUrl + post.source" :alt="post.title">
        </figure>
        

      </div>
    </div>
  </main>
</template>

<script>
import api from "@/api.js"
export default {
    data(){
      return{
        posts:[],
        baseUrl: 'http://localhost:4000/'
      }
    },
    created(){
      api.get('/posts').then(response => {
        this.posts = response.data
      })
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
        margin 20px 0px
        flex-wrap wrap
        figure 
          margin 10px
          width 33.3333333%
          width calc(33.3333333% - 20px)
          img
            display: block
            width 100%
</style>