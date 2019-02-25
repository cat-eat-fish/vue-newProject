<template>
  <div class="home">
    <myHeader/>
    <HelloWorld />
    <router-link to="/text">text</router-link>
    <mytext @doing="doing" />
    我是首页的msg:{{msg}}
    <div>
      <p>我当前的IP：{{textip}}</p>
      <p>我当前的城市：{{textcity}}</p>
      <p>我当前的经纬度：{{baiduPosition}}</p>
      省市区三级联动：
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
      <select v-model="myarea">
        <option value="-1">请选择市区</option>
        <option :value="index" v-for="(item,index) in area" :key="index">
          {{item}}  
        </option>  
      </select>
    </div>  
    
  </div>
</template>

<script>
// @ is an alias to /src
import myHeader from "@/components/header.vue"
import HelloWorld from '@/components/HelloWorld.vue'
import mytext from '@/components/mytext.vue'
import axios from 'axios'
import {text} from '@/api/user'
import {province} from '@/api/other'
export default {
  name: 'home',
  components: {
    HelloWorld,mytext,myHeader
  },
  data(){
    return {
      msg:"",
      province:{},
      myprovince:"-1",
      city:{},
      mycity:"-1",
      area:{},
      myarea:"-1",
      textip:"",
      textcity:"",
      baiduPosition:"",
      weatherinfo:'',
      caiyunInfo:"",
    }
  },
  created(){
    this.textip = returnCitySN.cip
    this.textcity = returnCitySN.cname
    var that = this;
    axios.get('baiduapi/').then(res=>{
      that.baiduPosition = [res.data.result.location.lng,res.data.result.location.lat]
      axios.get(`caiyunapi/v2/TAkhjf8d1nlSlspN/${that.baiduPosition[0]},${that.baiduPosition[1]}/forecast.json`).then(res=>{
        let data = res.data
        that.caiyunInfo = data.result;
      }).catch(err=>{console.log(err)})
    }).catch(err=>{console.log(err)});
  },
  mounted(){
    var that = this;
    this.province = province();
    
  },
  methods:{
    
    doing(opt){
      this.msg = opt.msg;
    },
    proChange(){
      if(this.myprovince != "-1"){
        axios.get(`myapi/data/city3jdata/provshi/${this.myprovince}.html`, {})
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
  },
}
</script>
