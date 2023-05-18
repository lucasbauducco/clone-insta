<template>
    <div class="grid">
        <figure v-for="mud in muds" :key="mud.mud_id">
          <img :src="baseUrl+ mud.source" :alt="mud.title" @click="navigateMud(mud)">
          <figcaption>
            <ul>
              <li v-if="mudLikes.includes(mud.mud_id)"> 
                <img src="@/assets/img/heart.svg" @click="likeMudDown(mud)" alt="Heart"/>
                <span>{{ mud.likes}}</span>
              </li>
              <li v-else> 
                <img src="@/assets/img/hornero.svg" @click="likeMud(mud)" alt="Hornero"/>
                <span>{{ mud.likes}}</span>
              </li>
              <li> 
                <img src="@/assets/img/comment.svg" alt="Logo Comment" @click="navigatePost(mud)">
                <span>{{ mud.comments}}</span>
              </li>
            </ul>
          </figcaption>
        </figure>
      </div>
</template>

<script>
    import api from '@/api.js'
export default {
    data(){
            return {
                iduser: this.$parent.id,
                muds: [],
                like: false,
                mudLikes: [],
                baseUrl: 'http://192.168.3.186:4000/',
                email: null,
                name:  'Juliet Waltier',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            }
        },
        created(){
            api.get(`/users/${this.iduser}`).then(response => {
                this.email = response.data.email
            })
            api.get(`/muds/user/${this.iduser}`).then(response => {
                this.muds = response.data
            })
            api.get(`/muds/likes/${this.$store.getters.loggedId}`).then(response => {
                this.mudLikes = response.data
            })
        },
}
</script>

<style lang="stylus" scoped>
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