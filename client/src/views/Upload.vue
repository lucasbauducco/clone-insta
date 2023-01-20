<template>
  <main>
    <div class="container">
        <article>
            <h1> Crear nueva <strong>publicación</strong>: {{ titulo }}</h1>
            <div class="flex">
                <div class="column">
                    
                <image-upload @selected="getName"></image-upload>
                </div>
                <div class="column">
                    <form @submit.prevent="publish">
                        <input type="text" placeholder="Título" v-model="titulo">
                        <input type="text" placeholder="Tag separados por comas" v-model="tags">
                        <textarea placeholder="Descripción" v-model="descripcion"></textarea>
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
            titulo: '',
            tags:'',
            descripcion:'',
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
        publish() {
            if (this.image==='') {
                alert('Seleccione una imagen');
                return;
            }
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