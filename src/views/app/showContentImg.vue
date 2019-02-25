<template>
    <div class="app-showContent">
        <cubeTitle title="图片详情"/>
        <div v-show="!delay" class="app-loading">
                <img src="../../assets/images/loading2.gif">
            </div>
            <dir v-show="delay">
                <div class="app-longImg" @click="hideImg">
                    <img ref="thisImg" :src="img" >
                </div>
            </dir>
        
    </div>
</template>
<script>
import cubeTitle from "@/components/cube/cube-title.vue"
import {getStyle} from "@/libs/util.js"
export default {
    name:"showContentImg",
    components: {cubeTitle},
    data(){
        return{
            delay:false,
            img:"",
        }
    },
    created(){
            this.img = this.$route.params.img;
    },
    mounted(){
            var that = this;
            var oImg= new Image();
            oImg.src = this.$route.params.img;
            if(oImg.height <= window.screen.height){
                document.querySelector('.app-longImg img').style.cssText = "display: block;position: absolute;top: 0;bottom: 0;margin: auto;";
                that.delay = true;
            }else{
                document.querySelector('.app-longImg img').style.cssText = "";
                that.delay = true;
            }
    },
    methods:{
        hideImg(){
            this.$router.back();
        },
    }
}
</script>



