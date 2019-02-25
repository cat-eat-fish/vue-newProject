<template>
    <div>
        <myHeader/>
        <div  class="content">
            <div class="weater-data">
                <div class="search">
                    <!-- <input type="text" placeholder="请输入搜索天气的城市"> -->
                    <select v-model="myprovince" @change="proChange">
                        <option value="-1">请选择省份</option>
                        <option :value="index" v-for="(item,index) in province" :key="index">
                        {{item}}  
                        </option>  
                    </select>
                    <select v-model="mycity" @change="cityChange">
                        <option value="-1">请选择城市</option>
                        <option :value="index" v-for="(item,index) in city" :key="index">
                        {{item}}  
                        </option>  
                    </select>
                    <button @click="goSearch">点击搜索</button>
                    
                </div>
                <p><span>城市：<span>{{weaterInfo.city}}</span></span></p>
                <p><span>天气状况：<span>{{weaterInfo.ganmao}}</span></span></p>
                <p><span>温度：</span><span>{{weaterInfo.wendu}}℃</span></p>
            </div>
            <div class="weater-data">
                <ul>
                    <h3>未来天气情况：</h3>
                    <li v-for="(item,index) in weaterInfo.forecast" :key="index">
                        <p><span>{{item.date}}</span>-------<span>{{item.type}}</span>-------<span>{{item.high}}</span>-------<span>{{item.low}}</span> </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import myHeader from "@/components/header.vue"
import {province} from '@/api/other'
export default {
    components:{myHeader},
    name:"myweather",   
    data(){
        return{
            weaterInfo:{},
            province:{},
            myprovince:"-1",
            city:{},
            mycity:"-1",
        }
    },
    created(){
        this.mydata();
        this.province = province();
        var that = this;
        axios.get('baiduapi/').then(res=>{
        that.baiduPosition = [res.data.result.location.lng,res.data.result.location.lat]
            axios.get(`caiyunapi/v2/TAkhjf8d1nlSlspN/${that.baiduPosition[0]},${that.baiduPosition[1]}/forecast.json`).then(res=>{
                let data = res.data
                that.caiyunInfo = data.result;
            }).catch(err=>{console.log(err)})
        }).catch(err=>{console.log(err)});
        
    },
    methods:{
        mydata(){
            var that = this;
            axios.get('https://www.apiopen.top/weatherApi').then(res=>{
                var data = res.data;
                if(data.code === 200){
                    that.weaterInfo = data.data;
                }
            }).catch(err=>{console.log(err)})
        },
        goSearch(){
            var that = this;
            if(this.mycity == -1){
                alert("请选择城市！")
            }else{
                axios.get(`https://www.apiopen.top/weatherApi?city=${that.city[that.mycity]}`).then(res=>{
                    var data = res.data;
                    if(data.code === 200){
                        that.weaterInfo = data.data;
                    }
                }).catch(err=>{console.log(err)})
            }
        },
        proChange(){
            var that = this;
            if(this.myprovince != "-1"){
                axios.get(`myapi/data/city3jdata/provshi/${that.myprovince}.html`, {})
                .then( res=> {
                var data = res.data;
                this.city = data;
                this.mycity = "-1"
                this.myarea = "-1"
                this.weatherinfo = ""
                })
            }else{
                this.city = {};
                this.area = {};
                this.mycity = "-1";
                this.myarea = "-1";
                this.weatherinfo = ""
            }
        },
        cityChange(){
            if(this.mycity != "-1"){
                axios.get(`myapi/data/city3jdata/station/${this.myprovince}${this.mycity}.html`, {})
                .then( res=> {
                    var data = res.data;
                    this.area = data;
                    this.myarea = "-1"
                    this.weatherinfo = ""
                })
            }else{
                this.area = {};
                this.myarea = "-1";
                this.weatherinfo = ""
            }
        },
    }
}
</script>




