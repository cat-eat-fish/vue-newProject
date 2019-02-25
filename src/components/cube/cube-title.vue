<template>
    <div class="cube-title" >
      <h1>{{title}}</h1>
      <i @click="back" class="cubeic-back"></i>
    </div>
</template>
<script>
export default {
    name:"cube-title",
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
    },
    data(){
        return{

        }
    },
    methods:{
        back() {this.$router.back()}
    }
    
}
</script>

<style>
.cube-title{position: relative;height: 44px;line-height: 44px;text-align: center;background-color: #edf0f4;box-shadow: 0 1px 6px #ccc;-webkit-backface-visibility: hidden;backface-visibility: hidden;z-index: 100;}
.cube-title h1{font-size: 16px;font-weight: 700}
.cube-title .cubeic-back{position: absolute;top: 0;left: 0;padding: 0 15px;color: #fc9153;}
        
</style>



