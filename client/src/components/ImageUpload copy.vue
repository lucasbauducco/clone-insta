<template>
    <div>
        <input id="imageFile" type="file" @change="selectFile($event)"/>
        <img id="image" v-if="image" :src="image"/>
        <label for="imageFile" @dragenter.stop.prevent="" @dragover.stop.prevent="" @drop="loadImage($event)">
            <h2 v-if="!image">Arrastra aquí imagen <br> para seleccionarla </h2>
            <svg v-if="!image" xmlns="http://www.w3.org/2000/svg" width="64px" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
        </label>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            image: ""
        }
    },
    mounted(){
        const width = this.$el.clientWidth
        this.$el.style.width = "500px"
        this.$el.style.height = "500px"
    },
    methods: {
        loadImage(e){
            e.stopPropagation()
            e.preventDefault()

            const transfer = e.dataTransfer
            const files = transfer.files  
            const image = files[0]

            const reader = new FileReader()

            reader.addEventListener("load", () => {
                this.image = reader.result
                this.$emit("selected", image)
            })
            if(image){
                reader.readAsDataURL(image)
            }
        },
        selectFile(e){
            const reader = new FileReader()

            reader.addEventListener("load", () => {
                this.image = reader.result
            })
            if(e.target.files){
                reader.readAsDataURL(e.target.files[0])
                this.$emit("selected", e.target.files[0])

            }
        }
    }
}
</script>

<style lang="stylus" scoped>
div 
    width 400px 
    background transparent 
    display flex
    justify-content center
    align-items center
    border 2px dashed #C1C1C1
    h2 
        text-align center
        color rgba(0,0,0,0.2)
        user-select none
    label
        position absolute
        display flex
        align-items center
        justify-content center
        svg
            width 200px
            position absolute
            z-index 0
            opacity 0.1
    img
        width: 100%
        aspect-ratio: 1
        object-fit: cover /* Recorta la imagen sin deformarla */
        object-position: center
input 
    position absolute
    top -9999px
    left -999px
</style>