<template>
    <div slot="content" class="scroll-wrapper">
        <cubeTitle title="全部"/>
        <div class="scroll-list-wrap" ref="scrollWrap">
            <cube-scroll ref="scroll" :data="items" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="foods-wrapper">
                    <div class="app-item" v-for="(item,index) in items" :key="index">
                            <div class="app-item-content">
                                <div class="app-item-author">
                                    <div class="app-item-thumb"> <img :src="item.profile_image" > </div>
                                    <div class="app-item-r">
                                        <div class="app-item-name">{{item.name}}</div>
                                        <div class="app-item-time">{{item.created_at}}</div>
                                    </div>
                                </div>
                                <div class="app-item-desc">{{item.text}}</div>
                                <div class="app-item-content">
                                    <div  v-if="item.type==10" class="app-item-content-img">
                                        <a href="javascript:;" ref="appImga" @click="goImg(item)"  >
                                            <img ref="img" :src="item.image0" data-original="../../assets/images/loading2.gif"  >
                                        </a>
                                    </div>
                                    <div v-else-if="item.type==41" class="app-item-content-video">
                                        <a href="javascript:;" class="app-item-content-video-a" @click="goVideo(item)">
                                            <img class="app-item-content-video-a-img" ref="img"  :src="item.image0"  data-original="../../assets/images/loading2.gif">
                                            <img class="playerBtn" src="../../assets/images/player.png" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="app-item-other">
                                    <span class="app-item-other-span">顶：{{item.ding}}</span>
                                    <span class="app-item-other-span">踩：{{item.cai}}</span>
                                    <span  class="app-item-other-span">评论:{{item.comment}}</span>
                                </div>
                            </div>
                        </div>
                </div>
            </cube-scroll>
        </div>
        <appHeader/>
    </div>
</template>
<script >
import cubeTitle from "@/components/cube/cube-title.vue"
import appHeader from "@/components/app/header"
import {recommend} from "@/api/app/data.js"
export default {
    name:"app-home",
    components: {appHeader ,cubeTitle},
    data() {
        return {
        items: [],
        pullDownRefresh: true,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullDownRefreshTxt: '刷新成功',
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        customPullDown: false,

        page:1,
        }
    },
    computed: {
        options() {
            return {
                pullDownRefresh: this.pullDownRefreshObj,   //下拉刷新
                pullUpLoad: this.pullUpLoadObj,             //上拉加载 
                scrollbar:true                              //滚动条 
            }
        },
        pullDownRefreshObj: function() {
            return this.pullDownRefresh ? {
                threshold: parseInt(this.pullDownRefreshThreshold),
                txt: this.pullDownRefreshTxt
            } : false
        },
        pullUpLoadObj: function() {
            return this.pullUpLoad ? {
                threshold: parseInt(this.pullUpLoadThreshold),
                txt: {
                more: this.pullUpLoadMoreTxt,
                noMore: this.pullUpLoadNoMoreTxt
                }
            } : false
        }
    },
    created(){
        this.upDate();
    },
    mounted(){
        
    },
    methods: {
        goImg(item){
            this.$router.push({name:'showContentImg',params:{img:item.image0}})
        },
        goVideo(item){
            this.$router.push({name:'showContentVideo',params:{video:item.videouri}})
        },
        upDate(){
            var that = this;
            this.page = 1;
            recommend(1,this.page).then(res=>{
                if(res.data.code == 200){
                    that.items = res.data.data;
                    that.$nextTick(()=>{
                        that.$refs.scrollWrap.style.cssText = "height:"+window.screen.height+"px";
                    })
                }
            }).catch(err=>{console.log(err)})
        },
        onPullingDown() {
            this.upDate();
        },
        onPullingUp() {
            var that = this;
            that.page++;
            recommend(1,this.page).then(res=>{
                if(res.data.code == 200){
                    that.items = that.items.concat(res.data.data)
                }
            }).catch(err=>{console.log(err)})
        },
  }
}
</script>

<style>
.scroll-list-wrap{height: 500px;}
</style>