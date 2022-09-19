<template>
  <div>
    
  </div>
</template>

<script>
export default {
    mounted(){
        const width = this.$el.clientWidth
        this.$el.style.height = width + "px"
    }
}
</script>

<style lang="stylus" scoped>
div 
    width auto
    background black
</style>