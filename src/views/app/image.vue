<template>
    <div class="app-img">
        <cubeTitle title="图片"/>
        <div class="scroll-list-wrap" ref="scrollWrap">
            <cube-scroll ref="scroll" :data="thisData" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="app-item" v-for="(item,index) in thisData" :key="index">
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
                            <div   class="app-item-content-img">
                                <a href="javascript:;" ref="appImga" @click="goImg(item)"  >
                                    <img ref="img" :src="item.image0" data-original="../../assets/images/loading2.gif"  >
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
            </cube-scroll>
        </div>
        <appHeader/>
    </div>
</template>
<script>
import cubeTitle from "@/components/cube/cube-title.vue"
import {recommend} from "@/api/app/data.js"
import appHeader from "@/components/app/header.vue"
export default {
    components:{appHeader,cubeTitle},
    name:"app-img",
    data(){
        return{
            thisData:[],

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
        this.mydata()
    },
    methods:{
        goImg(item){
            this.$router.push({name:'showContentImg',params:{img:item.image0}})
        },
        mydata(){
            var that = this;
            this.page = 1;
            recommend(3,this.page).then(res=>{
                let data = res.data;
                if(data.code === 200){
                    that.thisData = data.data;
                    that.$nextTick(()=>{
                        that.$refs.scrollWrap.style.cssText = "height:"+window.screen.height+"px";
                    })
                }
            }).catch(err=>{console.log(err)})
        },
        onPullingDown() {
            this.mydata();
        },
        onPullingUp() {
            var that = this;
            that.page++;
            recommend(1,this.page).then(res=>{
                if(res.data.code == 200){
                    that.thisData = that.thisData.concat(res.data.data)
                }
            }).catch(err=>{console.log(err)})
        },
    }
}
</script>








