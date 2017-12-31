<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div>
     <div class="search-div"> <mt-search v-model="value">
        <el-checkbox-group v-model="checkboxGroup5">

    
  
          <mt-cell
            v-for="(item,index) in result"
            :title="item.title"
            :value="item.value">
              <el-checkbox-button  :label="item" :key="item" @change="getChangeValue">{{item}}&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></el-checkbox-button>
           
           <!--  <p class="search-item "  :class="{'active': index === selected }" @click="checkIt(index)">{{item}}<i class="el-icon-arrow-right"></i></p> -->
              </mt-cell>
        </el-checkbox-group>
</mt-search>
</div>
    <div class="topData">
      <p class="nowTime">{{nowTime}}</p>
          <div class="leftData">
            <p>新增用户</p>
            <div><h1 >{{alldata}}</h1><sup class="showit" v-show='showIt'>+{{addData}}</sup></div>
            <div>
            <el-row>
              <el-col :span="12">
                <p class="p-name">同比昨天上涨</p>
                <h2>12.3%</h2>
              </el-col>
              <el-col :span="12">
                <p class="p-name">同比昨天上涨</p>
                <h2>12.3%</h2>
              </el-col>
            </el-row>
            </div>
          </div>
          <div class='rightData'>
             <p>在线用户</p>
             <div><h1 >{{alldata1}}</h1><sup class="showit" v-show='showIt'>{{addData1}}</sup></div>
          <div>
            <el-row>
              <el-col :span="12">
                <p class="p-name">同比昨天上涨</p>
                <h2>12.3%</h2>
              </el-col>
              <el-col :span="12">
                <p class="p-name">同比昨天上涨</p>
                <h2>12.3%</h2>
              </el-col>
            </el-row>
            </div>
          </div>
   <p class="nowTime1">{{nowTime}}</p>
    </div>
    <div class="chatcontent" style="">
    <div class="chartGroup" >
      <div class="chartitem" >
        <div class="chartitem-header" >
          <p class="title">近七日趋势</p>
          <a href="javascript:" :class="activeIndex==1?'btn-p active':'btn-p'" @click="getActive(1)">新增</a>
          <a href="javascript:" :class="activeIndex==2?'btn-p active':'btn-p'" @click="getActive(2)">激活</a>
          <a href="javascript:" :class="activeIndex==3?'btn-p active':'btn-p'" @click="getActive(3)">活跃</a>
        </div>
        <div class="chartitem-content">
          <div id="main" style="width: 100%;height:260px;float:left"></div>
        </div>
      </div>
    </div>
        <div class="chartGroup" >
      <div class="chartitem" >
        <div class="chartitem-header" >
          <p class="title">渠道分布TOP5</p>
          <a href="javascript:" :class="activeIndex==4?'btn-p active':'btn-p'" @click="getActive1(4)">新增</a>
          <a href="javascript:" :class="activeIndex==5?'btn-p active':'btn-p'" @click="getActive1(5)">激活</a>
          <a href="javascript:" :class="activeIndex==6?'btn-p active':'btn-p'" @click="getActive1(6)">活跃</a>
        </div>
        <div class="chartitem-content">
          <div id="main1" style="width: 100%;height:260px;float:left"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
 
</template>
<script type="text/javascript">
  import echarts from 'echarts'
    export default {
        name: '',
        data () {
            return {  
              result:['app','b','cpp','dpp','epp'],
              nowTime:'',
              selected:"",
              checkboxGroup5: [],
              addData:0,
              addData1:0,
              showIt:false,
              alldata:0,
              alldata1:0,
              activeIndex:1,
              charts: '',
              xData:['周一','周二','周三','周四','周五','周六','周日'],
              yData:[31, 71, 35, 73, 32, 63, 16],
              yData1:[131, 171, 135, 173, 132, 163, 116],
              ybingData:[
                  {value:335, name:'兵器少女'},
                  {value:310, name:'龙纹三国'},
                  {value:234, name:'尘缘'},
                  {value:135, name:'全明星斗地主'},
                  {value:148, name:'超能继承者'}
                ],
                ybingDataname:["兵器少女","龙纹三国","尘缘","全明星斗地主","超能继承者"]              
            }
        },
        methods:{
            getNowTime(){
              let t=new Date();
              let y=t.getFullYear();
              let m=t.getMonth()+1;
              let d=t.getDate();
              let time=y+"年"+m+"月"+d;
              this.nowTime=time;
             },
             getChangeValue(){
              console.log("变化值:",this.checkboxGroup5)
             },
            setTimeFun(){
                this.invt = setInterval(() => {
                     // this.add();//定时器只能使用这个方法 不然页面跳转之后循环会继续
                      this.addDataFun();
                    }, 2000)
          },
          checkIt(index){
            this.selected=index

          },
          addDataFun(){
               let temp =!this.showIt
               this.showIt=temp;
               if(temp==true){
                 this.addData=parseInt(Math.random()*15+1);
                 this.alldata=parseInt(this.alldata)+this.addData
                 this.addData1=parseInt(Math.random()*15+1)-parseInt(Math.random()*15+1);
                 this.alldata1=parseInt(this.alldata1)+this.addData1
               }   
          },
          getActive(value){
              this.activeIndex=value;
              let tempsz=[];
              let tempData=0;
              let tempsz1=[];
              let tempData1=0;
              let bingData=[];
              for(let i=0;i<7;i++){
                  tempData=parseInt(Math.random()*100+1);
                   tempData1=parseInt(Math.random()*100+1);
                   tempsz.push(tempData);
                   tempsz1.push(tempData1);
              }
              this.yData=tempsz;
              this.yData1=tempsz1
              this.drawPie('main');
          },
          getActive1(value){
              this.activeIndex=value;

             let bingData=[
                  {value:parseInt(Math.random()*100+1), name:'兵器少女'},
                  {value:parseInt(Math.random()*100+1), name:'龙纹三国'},
                  {value:parseInt(Math.random()*100+1), name:'尘缘'},
                  {value:parseInt(Math.random()*100+1), name:'全明星斗地主'},
                  {value:parseInt(Math.random()*100+1), name:'超能继承者'}
                ]
                this.ybingData=bingData;
                console.log("sdadas",this.ybingData)
                this.drawPie1('main1');
          },
           drawPie(id){
             let colors = ['#5793f3', 'rgb(86,201,255)', '#675bba'];
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 color: colors,
                 title: {
                      text: '',
                      textStyle:{
                             fontSize:'14'//更改横坐标字体大小颜色
                         }
                  },
                  grid: {
                      top: 30,
                      bottom: 30//表上下之间的距离
                  },
                  tooltip: {
                      trigger: 'axis',
                      show:true,//内容提示
                  },
                  legend: {
                      data:[]//此处是最上方的折线对应关系提示
                  },
                  toolbox: {//此处是上方的导出图片等功能
                      show: false,
                      feature: {
                          dataZoom: {
                              yAxisIndex: 'none'
                          },
                          dataView: {readOnly: false},
                          magicType: {type: ['line', 'bar']},
                          restore: {},
                          saveAsImage: {}
                      }
                  },
                  xAxis:  {
                      axisLine: {
                          onZero: false,
                          lineStyle: {
                              color: colors[1]
                          }
                      },
                      type: 'category',
                      boundaryGap: false,
                      data: this.xData,
                       axisLabel: {
                           textStyle:{
                             fontSize:'10'//更改横坐标字体大小颜色
                         }

                      }
                  },
                  yAxis: {
                      name:'温度/ °C',
                      type: 'value',
                      axisLabel: {
                          formatter: '{value} ',
                           margin:0,
                           textStyle:{
                             color:"#aaa",
                             fontSize:'10'////更改纵坐标字体大小颜色
                         }

                      }
                   
                  },
                 series: [
                     {
                        name:'最高气温',
                        type:'line',
                         smooth: true,

                        data:this.yData,
                        markPoint: {
                            data: [
                                
                            ]
                        },
                    },
                      {
                        name:'最低气温',
                        type:'line',
                         smooth: true,
                          stack: '总量',
                        data:this.yData1,
                        markPoint: {
                            data: [
                                
                            ]
                        },
                    }

                 ]
               })
            },
              drawPie1(id){
             let colors = ['rgb(143,158,165)', 'rgb(92,195,238)', 'rgb(234,111,103)','rgb(225,206,114)','rgb(96,184,97)'];
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 color: colors,
/*                 grid: {
                      left: 30,
                      bottom: 30//表上下之间的距离
                  },*/
                  title: {
                            text: '',
                            textStyle:{
                                   fontSize:'12'//更改横坐标字体大小颜色
                               }
                        },
                         tooltip: {
                          trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)"
                      },
                    legend: {
                        data:this.ybingDataname,
                        x : 'center',
                        y : 'bottom',
                        icon : 'bar',
                             data:[
                        {
                            name:'兵器少女',
                             textStyle:{
                              fontSize:12,
                              fontWeight:'bolder',
                              color:'#df3434'
                          },
                          icon:'stack'
                        }

                    ]

                    },
                  series: [
                      {
                          name:'访问来源',
                          type:'pie',
                          radius: ['50%', '40%'],//分别代表内环大小,以及外环大小
                          avoidLabelOverlap: false,
                          label: {
                              normal: {
                                  show: false,//饼内内容
                                  position: 'center'
                              },
                              emphasis: {
                                  show: true,
                                  textStyle: {
                                      fontSize: '20',
                                      fontWeight: 'bold'
                                  },
                                  left:0,
                              }
                          },
                          labelLine: {
                              normal: {
                                  show: false
                              }
                          },
                          data:this.ybingData
                      }
                  ]
               })
            },
        },
        mounted(){
           this.getNowTime();
           this.setTimeFun();
           this.alldata=parseInt(Math.random()*1000+1).toLocaleString();
           this.alldata1=parseInt(Math.random()*1000+1).toLocaleString();
           this.$nextTick(function() {
                this.drawPie('main');
                this.drawPie1('main1');
            })
        },
         destroyed () {
            clearInterval(this.invt)//页面跳转之前移除定时循环
        }
      }
</script>
<style scoped>
  .topData{
    background: rgb(50,141,224);
    float: left;
    width: 100%;

  }
   .nowTime{
      color: #ccc;
      float: left;
      width: 100%;
    }

    .mint-search-list{
      z-index: 9
    }
       .nowTime1{
      color: #ccc;
      float: left;
      width: 100%;
      color: rgb(50,141,224)
    }
    .leftData,.rightData{
      background: white;
      
      width: 45%;
      float: left;
       margin-left: 3%;
       border-radius: 5px;
    }
  h1{
    color: rgb(51,179,244);
    border-bottom: 1px solid #ccc;
    float: left;
    width: 65%;
    margin-left: 17%;
  }
  sup{
    float: left;
    width: 15%;

  }
  .showit{
    background: rgb(255,122,123);
    color: white;
  }
  .p-name{
    width: 100%;
    font-size: 0.6rem;
    text-align: center;
    color: #ccc;
  }
  .chatcontent{
    background:rgb(126,191,255);
    width: 100%;
    float: left;
  }
  .chartGroup{
    width: 100%;
    float: left;
    display: flex;
    width: 90%;
    margin-left: 5%;
    background: white;
    margin-bottom: 1rem;
  }
  .chartitem{
   flex: 1

  }
  .chartitem-header{
    height: 1.4rem;
    line-height: 1.4rem;
    border-bottom: 1px dashed rgb(126,191,255)
  }
  .title{
    float: left;
    text-align: left;
    font-size: 0.9rem;
  }
  .btn-p{
    float: right;
    font-size: 0.8rem;
    margin-right: 0.6rem;
    cursor: pointer;
    color: rgb(112,112,112);
  }
  .active{
    text-decoration: underline;
    color: rgb(126,191,255)
  }

  .chartitem-content{
    width: 100%;
    float: left;
  }
  .search-div{
    width: 100%;
    height: 2rem;
  }
</style>