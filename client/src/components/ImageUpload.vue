<template>
    <div>
        <div class="flex .justify-content">
            </div>
            <hr />
            <input
            ref="input"
            type="file"
            name="image"
            accept="image/*"
            @change="setImage"
            />
            <div class="content">
                <section class="cropper-area">
                    <div class="img-cropper">
                      <vue-cropper
                          ref="cropper"
                          :autoCrop="true"
                          :minCropBoxWidth="100"
                          :maxCropBoxWidth="1080"
                          :checkCrossOrigin="true"
                          :aspect-ratio="4/5"
                          :src= "imgSrc"
                          preview=".preview"
                      />
                    </div>
                    <div class="actions">
                      <a
                          href="#"
                          role="button"
                          @click.prevent="cropImage"
                      >
                          Crop
                      </a>
                      <a
                          href="#"
                          role="button"
                          @click.prevent="reset"
                      >
                          Reset
                      </a>
                      <a
                          href="#"
                          role="button"
                          @click.prevent="showFileChooser"
                      >
                          Upload Image
                      </a>
                    </div>
                </section>
                <section class="preview-area">
                    <div class="preview" />
                    <div class="cropped-image">
                      <img
                          ref="imageCut"
                          v-if="image"
                          :src="image"
                          alt="Cropped Image"
                      />
                      <div v-else class="crop-placeholder"/>
                    </div>

                </section>
            </div>
    </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    data(){
        return{
            
            imgSrc: "https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105__340.png",
            image: ''
        }
    },
    components: {
        VueCropper
    },
    mounted(){
        const width = this.$el.clientWidth

    },
    methods: {
    cropImage() {
      const reader = new FileReader()
      var blob;
      // get image data for pthisost processing, e.g. upload or setting image src
      this.image = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$emit("selected", this.image)
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    getCropBoxData() {
     
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
      this.cropImage()
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    crop(image, x, y, width, height) {
      // create a canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let orig_src = new Image();
      var heightcanvas = 5*height/4;
      orig_src.src = image;

      // set canvas size
      canvas.width = 1080;
      // If you want aspect ration 4:5 uncomment the line below.
  
      canvas.height = 1350;
      // draw the image
      ctx.drawImage(orig_src,0,0,1080,1350,0,0,width,height);

      // return the data url
      return canvas.toDataURL();
    },
        setImage(e) {
            const file = e.target.files[0]
            if (file.type.indexOf('image/') === -1) {
                alert('Please select an image file')
                return;
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader()
                const img = new Image() 
                reader.onload = (event) => {
                this.image= event.target.result
                // rebuild cropperjs with the updated source
                this.$refs.cropper.replace(event.target.result)
                img.src= this.image;
                // cut an image
                  this.image = this.crop(this.image, 50, 50, img.width, img.height)
                  this.$emit("selected", this.image)
                }
                reader.readAsDataURL(file)

              } else {
                alert('Sorry, FileReader API not supported')
            }
        },
        showFileChooser() {
        this.$refs.input.click();
        },
        zoom(percent) {
        this.$refs.cropper.relativeZoom(percent);
        },
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
        },
    }
}
</script>

<style >
body {
  font-family: Arial, Helvetica, sans-serif;
  width: 1024px;
  margin: 0 auto;
}
input[type="file"] {
  display: none;
}
.header {
  padding: 20px;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
}

.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 150px;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.crop-placeholder {
  width: 150px;
  aspect-ratio: 4 / 5;
  background: #ccc;
  margin-top: 5px;
}
.cropped-image {
  margin-top: 10px;
}
.cropped-image img{
  background: #ffffff;
  width: 150px;
  aspect-ratio: 4 / 5;
}
</style>