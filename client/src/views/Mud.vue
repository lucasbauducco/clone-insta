<template>
    <main>
      <div class="container">
          <article>
              <h1> Crear nueva <strong>publicación</strong>: {{ text }}</h1>
              <div class="flex upload">
                  <div class="column">
                      
                  <image-upload @selected="getName"></image-upload>
                  </div>
                  <div class="column">
                      <form @submit.prevent="publish">
                          <input type="text" placeholder="Tag separados por comas" v-model="tags">
                          <textarea placeholder="Mud" v-model="text"></textarea>
                          <input class="form-submit" type="submit" value="Publicar Ahora">
                      </form>
                  </div>
              </div>
          </article>
          
      </div>
    </main>
  </template>
  
  <script>
      import ImageUpload from '@/components/ImageUpload.vue'
      import api from '@/api.js'
      import { constants } from 'buffer'
  
  export default {
      data() {
          return {
              tags:'',
              text:'',
              image: '',
          }
      },
      mounted() {
      },
      methods: {
          getName(value) {
             this.image = value
          },
          //return a promise that resolves with a File instance
          dataURLtoFile(dataurl, filename) {
              
              var arr = dataurl.toString().split(','),
                  mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), 
                  n = bstr.length, 
                  u8arr = new Uint8Array(n)
                  
              while(n--){
                  u8arr[n] = bstr.charCodeAt(n)
              }
              
              return new File([u8arr], filename, {type:mime})
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
        var dif= 1080 - width;
        if(dif>0){
          width = width + dif;
          height = width/aspect_ratio;
        }else{
          width = width - dif;
          height = width/aspect_ratio;
        }
        if(height < 1350){
          var dif = 1350 - height;
          y = dif/2;
        }
        // draw the image
        ctx.fillStyle = "rgba( 255, 255, 255 , 1)";
        ctx.fillRect (0, 0, 1080, 1350);
        ctx.drawImage(orig_src,x,y,width,height);
  
        // return the data url
        return canvas.toDataURL();
      },
          publish() {
            if(this.image===""){
                var img = new Image()
  
                img.src= this.image
                if(img.width>1200 || img.height>1350){
                    alert("Ingrese una imagen menor a 1200x1350")
                    this.image=''
                    return;
                }
                this.image = this.crop(this.image, img.width, img.height)
                this.image = this.dataURLtoFile(this.image, 'image.jpg')
            }
              const formData = new FormData()
              formData.set('text', this.text)
              formData.set('tags', this.tags)
              formData.set('user_id', this.$store.getters.loggedId)
              formData.append('source', this.image)
  
              api.post('/muds', formData, {
                  headers: {
                  'content-type': 'multipart/form-data'
                  }
              }).then(result => {
                  if(result.data.ok)
                      this.$router.push('/')
              })
          }
      },
  
      components:{
          ImageUpload
      }
  }
  
  </script>
  
  <style lang="stylus" scoped>
      main
        background  #EEEEEE
        padding-top 50px
        min-height 100vh
        @media screen and (max-width: 480px)
          .upload
              flex-direction column
        h1 
          margin 0
          margin-bottom 0px
        article
          margin-top 30px
      div.column
          width 100%
  
      form 
          padding-left 20px
  
  </style>