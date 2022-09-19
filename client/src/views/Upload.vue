<template>
  <main>
    <div class="container">
        <article>
            <h1> Crear nueva <strong>publicación</strong></h1>
            <div class="flex">
                <div class="column">
                    <image-upload></image-upload>
                </div>
                <div class="column">
                    
                </div>
            </div>
        </article>
        
    </div>
  </main>
</template>

<script>
    import ImageUpload from '@/components/ImageUpload.vue'
export default {
    components:{
        ImageUpload
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
    div.column
        width 50%
</style>