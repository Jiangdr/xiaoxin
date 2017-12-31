<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div class="yangbenItem">
   <div class="wenjuanTimu">
     <p class="title">问卷题目</p>
     <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="选项"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="小计"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="百分比"
        >
      </el-table-column>
    </el-table>
   </div>
   <div class="wenjuanchart">
      <el-radio-group v-model="radio" size="small" style="float:left" @change="getChart">
        <el-radio-button label="0"><img src="../../../static/img/bing.png"/>&nbsp; 饼图</el-radio-button>
        <el-radio-button label="1"><img src="../../../static/img/zhu.png"/>&nbsp; 柱状图</el-radio-button>
        <el-radio-button label="2" ><img src="../../../static/img/tiao.png"/>&nbsp; 条形图</el-radio-button>
        <el-radio-button label="3"><img src="../../../static/img/zhe.png"/>&nbsp; 折线图</el-radio-button>
     </el-radio-group>
     <div :id="parentToChildID" style="width: 100%;height:260px;max-width:640px;margin:auto;margin-top:30px;"></div>
   </div>
		
			
</div>
 
</template>
<script type="text/javascript">
  import echarts from 'echarts'
 
    export default {
        name: '',
        data () {
            return {  
              radio:'0',
            tableData: [{
              date: '选项1',
              name: '22',
              address: '5%'
            }, {
              date: '选项2',
              name: '23',
              address: '12%'
            }, {
              date: '选项3',
              name: '34',
              address: '5%'
            }, {
              date: '选项4',
              name: '434',
              address: '6%'
            }],
               ybingData:[
                  {value:335, name:'安卓',xiaoji:'23'},
                  {value:310, name:'IOS',xiaoji:'23'},
                ],
                ybingDataname:["安卓","IOS"],
                xzhuDataname:["选项1","选项2","选项3","选项4"],
                yzhuData:[56,34,43,54]
            }
        },
         props:["parentToChildID"],
        methods:{
          getChart(num){
            console.log(num)
            if(num==0){
              this.$nextTick(function() {
                  this.getBingChart(this.parentToChildID);
              })
            }
            else if(num==1){
              this.$nextTick(function() {
                  this.getZhuChart(this.parentToChildID);
              })
            }
            else if(num==2){
              this.$nextTick(function() {
                  this.getTiaoChart(this.parentToChildID);
              })
            }
            else if(num==3){
              this.$nextTick(function() {
                  this.getZheChart(this.parentToChildID);
              })
            }
              
            },
           getBingChart(id){
             let colors = ['rgb(11,196,224)', 'rgb(133,201,118)','rgb(72,110,146)','rgb(36,140,203)'];
            
              if (this.charts && this.charts.dispose) {
              this.charts.dispose();
              }
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 color: colors,
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
                            name:'安卓',
                             textStyle:{
                              fontSize:12,
                              fontWeight:'bolder',
                              color:'rgb(11,196,224)'
                          },
                          
                          icon:'stack'
                        },
                         {
                            name:'IOS',
                             textStyle:{
                              fontSize:12,
                              fontWeight:'bolder',
                              color:'rgb(133,201,118)'
                          },
                      }

                    ]

                    },
                  series: [
                      {
                          name:'你好',
                          type:'pie',
                          radius: ['40%', '60%'],//分别代表内环大小,以及外环大小
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
                                  show: true
                              }
                          },
                          data:this.ybingData
                      }
                  ]
               })
            },
            getZhuChart(id){
             let colors = ['rgb(11,196,224)', 'rgb(133,201,118)','rgb(72,110,146)','rgb(36,140,203)'];
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 color: colors,
                   tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.xzhuDataname,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                       
                        type:'bar',
                        barWidth: '60%',
                        data:this.yzhuData
                    }
                ]
               })
            },
     getTiaoChart(id){
             let colors = ['rgb(11,196,224)', 'rgb(133,201,118)','rgb(72,110,146)','rgb(36,140,203)'];
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                color: colors,
               tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
            },
            legend: {
                
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0,0 ]
            },
            yAxis: {
                type: 'category',
                data: this.xzhuDataname
            },
            series: [
               
                {
                    
                    type: 'bar',
                    data: this.yzhuData
                }
            ]
               })
            },
       getZheChart(id){
             let colors = ['rgb(11,196,224)', 'rgb(133,201,118)','rgb(72,110,146)','rgb(36,140,203)'];
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                color: colors,
             tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  
              },
            
              xAxis:  {
                  type: 'category',
                  boundaryGap: false,
                  data: this.xzhuDataname
              },
              yAxis: {
                  type: 'value',
                  axisLabel: {
                      formatter: '{value} °C'
                  }
              },
              series: [
                  {
                     
                      type:'line',
                      data:this.yzhuData,
                      markPoint: {
                          data: [
                              {type: 'max', name: '最大值'},
                             
                          ]
                      },
              
                  },
              
              ]
               })
            }
            
        },
        mounted(){

          this.getChart(0)
           
        },
         components: {
		      echarts,
		  
		  }
        
      }
</script>
<style lang="sass" scoped>
 
 

 
</style>