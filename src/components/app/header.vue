<template>
    <div class="app-header">
        <nav>
            <ul>
                <li :class="{active:headactive == index}"  @click="jump(item)"  v-for="(item,index) in navData" :key="index">
                    {{item.text}}
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name:"app-header",
    data(){
        return{
            navData:[
                {id:0,text:"全部",url:"/appHome"},
                {id:1,text:"视频",url:"/appVideo"},
                {id:2,text:"图片",url:"/appImg"},
                {id:3,text:"文字",url:"/appText"},
            ]
        }
    },
    computed:{
        headactive(){
            return  this.$store.state.headactive;
        },
    },
    created(){

    },
    mounted(){
        
    },
    methods:{
        jump(item){
            this.$router.push({path:item.url});
            this.$store.commit('newheadactive',item.id)
        }
    }
}
</script>




