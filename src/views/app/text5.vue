<template>
    <div slot="content" class="scroll-wrapper">
        <div class="scroll-list-wrap" ref="scrollWrap">
            <cube-scroll ref="scroll" :data="items" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="foods-wrapper">
                    <div   v-for="(item,index) in items" :key="index" class="app-scroll-item">
                        <div class="app-scroll-item">
                            <router-link to="/text3">
                                {{item.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </div>
</template>
<script >
import {recommend} from "@/api/app/data.js"
export default {
    name:"text5",
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
  methods: {
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