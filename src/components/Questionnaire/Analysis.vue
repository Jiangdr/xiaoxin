<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div class="vue-content">
   <indexheader></indexheader>
	   <div class="vue-content">
	   <div class="editContent" :style="'height:'+ htHeight+'px'"> 
	   <htside   :parentToChildIndex="activeindex"></htside>
	    <div class="creatcontent" >
    	 <div class="ht-analysis">
    	 	<el-row :gutter="30">
			  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			  		<el-row :gutter="10">
			  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
			  	<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>问卷浏览量</span>
				     
				  </div>
				  <div class="text item">
				    <h1>{{datasource.pviews}}</h1>
				    <p class='nowtime'>问卷实时访问量</p>
				  </div>
				</el-card>
			  </el-col>
			   <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
			  	<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>问卷回收量</span>
				     
				  </div>
				  <div class="text item">
				    <h1>{{datasource.reNum}}</h1>
				    <p class='nowtime'>问卷实时回收量</p>
				  </div>
				</el-card>
			  </el-col>
			   <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
			  	<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>问卷回收率</span>
				     
				  </div>
				  <div class="text item">
				    <h1>{{datasource.reNum/datasource.pviews*100 | getper}}%</h1>
				    <p class='nowtime'>回收率=回收量/访问量</p>
				  </div>
				</el-card>
			  </el-col>
			   <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
			  	<el-card class="box-card" >
				  <div slot="header" class="clearfix">
				    <span>平均完成时间</span>
				     
				  </div>
				  <div class="text item" >
				    <h1>{{datasource.avgTime| getTime}}秒</h1>
				    <p class='nowtime'></p>
				  </div>
				</el-card>
			  </el-col>
			</el-row>
			  </el-col>
			    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-top:40px;">
			    	<el-card class="box-card charts-card">
				  <div slot="header" class="clearfix">
				    <p class="pchart" >回收来源</p>
				    <p  class="pchartname">按系统分类</p>
				  </div>
				  <div class="text item">
				    <div id="main1" style="width: 100%;height:260px;float:left"></div>
				  </div>
				</el-card>
			    </el-col>
			 
			</el-row>
    	 </div>
		</div>
	   </div>
	  </div>
</div>
 
</template>
<script type="text/javascript">
  import echarts from 'echarts'
  import indexheader from "./IndexHeader.vue"
  import htside from "./IndexLeft.vue"
  import { getajax } from '../../ajax'
 const dataget=getajax.ajaxFun
    export default {
        name: '',
        data () {
            return {  
             htHeight:document.body.clientHeight-121,
              activeindex:'1',
              datasource:{},
               ybingData:[
                  {value:335, name:'安卓'},
                  {value:310, name:'IOS'},
                  {value:310, name:'其他'},
                ],
                tjid:'',
                ybingDataname:["安卓","IOS","其他"]  
           
            }
        },
        created(){
               document.title="简乐互动问卷调查系统"
              },
        methods:{
           drawPie1(id){
             let colors = ['rgb(11,196,224)', 'rgb(133,201,118)','rgb(72,110,146)'];
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

                      },
                      {
                         name:'其他',
                             textStyle:{
                              fontSize:12,
                              fontWeight:'bolder',
                              color:'rgb(72,110,146)'
                          },
                      }


                    ]

                    },
                  series: [
                      {
                          name:'回收来源',
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
            getAnaData(){
              let data={
                "id":this.tjid
              }
               dataget("post", data," ","/qnaire/answer/index",this.getAjaxSuccess);
              
            },
           getAjaxSuccess(res){
                console.log("res:",res)
                if(res.flag==1){
                  this.datasource=res.msg
                  this.ybingData=[
                  {value:this.datasource.source.android, name:'安卓'},
                  {value:this.datasource.source.ios, name:'IOS'},
                  {value:this.datasource.source.other, name:'其他'},
                ]
                 this.$nextTick(function() {
                this.drawPie1('main1');
            })

                  // this.$message({
                  //   showClose: true,
                  //   message: res.msg,
                  //   type: 'success'
                  // });
                }
                else if(res.flag==2){
                   this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                      });
                  this.$router.push('/login');
                }
               else{
                 this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                  });
               }
            }

        },
        mounted(){
            this.tjid=this.$route.query.id;
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.htHeight = window.screenHeight-121
                })()
            }
            this.getAnaData();
             console.log(document.body.clientHeight-121);
           
        },
         components: {
		      indexheader,
		      echarts,
		      htside,
		  },
      filters: {  
              getper(value) {  
              var value=Math.round(parseFloat(value)*100)/100;
               var xsd=value.toString().split(".");
               if(xsd.length==1){
               value=value.toString()+".00";
               return value;
               }
               if(xsd.length>1){
               if(xsd[1].length<2){
                value=value.toString()+"0";
               }
               return value;
               }
                
            },
            getTime(value){
              var theTime = parseInt(value);// 秒
                var theTime1 = 0;// 分
                var theTime2 = 0;// 小时
                // alert(theTime);
                if(theTime > 60) {
                theTime1 = parseInt(theTime/60);
                theTime = parseInt(theTime%60);
                // alert(theTime1+"-"+theTime);
                if(theTime1 > 60) {
                theTime2 = parseInt(theTime1/60);
                theTime1 = parseInt(theTime1%60);
                }
                }
                var result = ""+parseInt(theTime);
                if(theTime1 > 0) {
                result = ""+parseInt(theTime1)+"分"+result;
                }
                if(theTime2 > 0) {
                result = ""+parseInt(theTime2)+"小时"+result;
                }
                return result; 
            }  
        },
          watch: {
            htHeight (val) {
                this.htHeight = val
            }
        }

        
      }
</script>
<style lang="sass" scoped>
 .editContent{
  overflow-y:auto;
 }
 .ht-analysis{
 	width:100%;
   	max-width:1000px;
   	min-height:300px;
   	margin:auto;
   	margin-top:50px;
   	margin-bottom:50px;
 }
 

 
</style>