<template>
    <div class='app-scroll-content'>
        <div class='app-scroll-scroll'>
       	    <div class="app-scroll-loading"></div>
            <!-- <div class="app-scroll-toploading">{{topText}}</div> -->
            <div class='app-scroll-item' v-for="(item,index) in dataList" :key="index">{{item.name}}</div>
            <div class="app-scroll-bottomloading">{{bottomText}}</div>
        </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'
import {recommend} from "@/api/app/data.js"
export default {
    name: 'text3',
    data () {
        return {
            topText:"刷新中...",
            bottomText:"加载中...",
            pageNo: 1,              //当前页数
            totalPage: 10,          //总页数
            isPullDown: true,
            dataList:[],            //数据列表
            options: {
                probeType: 3,
                pullDownRefresh: {
                    threshold: 40, // 刷新时机
                    stop: 30       // 回弹停留的距离
                },
                pullUpLoad: {
                    threshold: 20  // 开始加载的时机
                },
                startY: 0
            }
        }
    },
    created () {
        this.requestData()
    },
    mounted () {
        this.$nextTick(() => {
            this.initScroll()
        })
    },
    methods: {
        initScroll () {
            this.myScroll = new Bscroll('.app-scroll-content', this.options)
            this.pullDownEvent()
            this.pullUpLoadEvent()
        },
        requestData () {
            var that = this;
            recommend(1,that.pageNo).then(res => {
                if (that.isPullDown) {
                    that.dataList = [] // 清空数据，以防重复渲染
                    that.dataList = res.data.data;
                }else{
                    var newData = that.dataList.concat(res.data.data);
                    that.dataList = newData;
                }
                that.$nextTick(() => {
                    that.finishPulling();
                })
            })
        },
        finishPulling() {
            this.myScroll.finishPullDown() // 结束下拉刷新
            this.myScroll.finishPullUp()   // 结束上拉加载更多
            this.myScroll.refresh()        // dom节点变化，重新计算better-scroll
            this.bottomText = "加载中...";
            this.topText = "下拉刷新！";
        },
        pullDownEvent () {
            this.topText = "刷新中...";
            this.myScroll.on('pullingDown', () => {
                // console.log('下拉刷新')
                this.topText = "刷新中...";
                this.isPullDown = true
                this.pageNo = 1
                this.requestData()
            })
        },
        pullUpLoadEvent () {
            this.myScroll.on('pullingUp', () => {
                // console.log('上拉加载');
                this.pageNo++;
                this.isPullDown = false;

                if(this.pageNo < this.totalPage){
                    this.requestData()
                }else{
                    this.bottomText = "没有更多了!"
                }
            })
        }
    }

}
</script>
<style>
    /* .scroll{overflow: auto} */
    
</style>



