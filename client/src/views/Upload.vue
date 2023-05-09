<template>
    <main>
      <div class="home container">
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
                    <div class="p-post">
                      <p>{{ descripcion }}</p>
                    </div>
                    <div class="mud-body">
                      <img class="img-post" :src="preview" alt="El Chaltén">
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
                  <a class="follow" >
                    <img src="@/assets/img/hornero.svg" alt="Logo like"/>
                  </a>
              </div>
          </div>
          <div class="container">
                <article>
                    <div class="flex upload">
                        <div class="column">
                            
                        <image-upload @selected="getName"></image-upload>
                        </div>
                        <div class="column">
                            <form enctype="multipart/form-data" @submit.prevent="publish">
                                <input type="text" placeholder="Título" v-model="titulo">
                                <input type="text" placeholder="Tag separados por comas" v-model="tags">
                                <textarea style="white-space: pre-line" placeholder="Descripción" v-model="descripcion"></textarea>
                                <input
                                  ref="input"
                                  type="file"
                                  name="image"
                                  accept="image/*"
                                  @change="setImage"
                                  />
                                <input class="form-submit" type="submit" value="Publicar Ahora">
                            </form>
                        </div>
                    </div>
                </article>
                
            </div>
        </div>
      </div>
      
    </main>
  </template>

<script>
    import api from '@/api.js'
    import { constants } from 'buffer'

export default {
    data() {
        return {
            titulo: '',
            tags:'',
            descripcion:'',
            preview:'',
            image: '',
        }
    },
    mounted() {
    },
    methods: {
        setImage(e){
          var input = e.target
          if (input.files) {
            var reader = new FileReader()
            reader.onload = (e) => {
                this.image= e.target.result
                var img = new Image();

                img.src= this.image;
                console.log(img.src.width);
                console.log(img.src.height);
              this.image = this.crop(this.image, img.src.width, img.src.height);
              this.preview = this.image;
              
            }
            this.image=input.files[0];
            reader.readAsDataURL(input.files[0]);
          }
        },
        crop(image, width, height) {
          // create a canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          var x = 0;
          var y = 0;
          var aspect_ratio= width/height;
          let orig_src = new Image();
          var heightcanvas = 5*height/4;
          orig_src.src = image;

          // set canvas size
          canvas.width = 1080;
          // If you want aspect ration 4:5 uncomment the line below.
      
          canvas.height = 1350;
          // draw the image
          ctx.fillStyle = "rgba( 255, 255, 255 , 1)";
          ctx.fillRect (0, 0, width, height);
          ctx.drawImage(orig_src,x,y,width,height);

          // return the data url
          return canvas.toDataURL();
      },
        getName(value) {
           this.image = value
        },
        publish() {
            if (this.image==='') {
                alert('Seleccione una imagen');
                return;
            }
            var img = new Image()

                  img.src= this.image
                  if(img.width>1200 || img.height>1350){
                    alert("Ingrese una imagen menor a 1200x1350")
                    this.image=''
                    return;
                  }
            this.image = this.crop(this.image, img.width, img.height)
            this.image = this.dataURLtoFile(this.image, 'image.jpg')
            const formData = new FormData()
            formData.set('title', this.titulo)
            formData.set('tags', this.tags)
            formData.set('description', this.descripcion)
            formData.set('user_id', this.$store.getters.loggedId)
            formData.append('source', this.image)

            api.post('/posts', formData, {
                headers: {
                'content-type': 'multipart/form-data'
                }
            }).then(result => {
                if(result.data.ok)
                    this.$router.push('/')
            })
        }
    },

    /*components:{
        ImageUpload
    }*/
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
        div.mud 
          background-color #dddddd
          width 100%
          height auto
          padding 0.8rem
          div.mud-post 
            display flex
            div.avatar
              align-items  center
              img
               width 4rem
            div.mud-body
              width 100%
              align-content center
              div.top
                width 100%
                padding 1.4rem 0 0 0
                display flex 
                justify-content space-between
                font-size 1rem
              div.follow
              img
                object-fit: cover;
                width:100%;
                height:100%;

              div.p-post
                p
                  font-size 1rem
                  width 20rem
                  padding 1px
                  /* Control de la altura con base en el texto del div*/
                  height: auto;
                  word-wrap: break-word;
          div.mud-footer
            display flex
            justify-content flex-end 
            a
              padding 0.2rem 0.2rem
              img
                width 1.4rem
</style>