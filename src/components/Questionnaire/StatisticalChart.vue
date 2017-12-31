<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div class="vue-content">
   <indexheader ></indexheader>
	   <div class="vue-content">
	   <div class="editContent" :style="'height:'+ htHeight+'px'"> 
	   <htside   :parentToChildIndex="activeindex"></htside>
	    <div class="creatcontent" >
    	 <div class=" ht-yangben ht-statical">
        <div class="yangben-header">
              <p class="wjTitle">问卷标题:&nbsp;<span>{{title}}</span></p>
         <div class="editheader">
          <ul>
          	<li class="selectli" style="margin-right:15px;">
               <el-select v-model="selvalue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
              <el-tooltip class="item" effect="dark" content="打印" placement="top">
              <li class="iconli"><img src="../../../static/img/dayin.png" style="margin-top:5px;"></li>
             </el-tooltip>
           
            <li ><el-button>导出统计结果</el-button></li> 
            
          </ul>
         </div>
         <div class="timeSelect">
          时间选择:
              <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
         </div>
          <div class="timeSelect">
          过滤数据:
            <el-button >IP去重</el-button>
         </div>
        </div>
        <div class="yangbenshow">
        	<htstatsel :parentToChildID="0"  />
        	<htstatinput />
        	<htstatsel :parentToChildID="1"/>
        	<htstatinput />
        </div>
 
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
   import htstatsel from "./HtStaticalSelect.vue"
   import htstatinput from "./HtStaticalInput.vue"
    export default {
        name: '',
        data () {
            return {  
             htHeight:document.body.clientHeight-121,
             activeindex:'3',
             title:'问卷调查1',
            
              pagesize:2,
              options: [{
                value: '0',
                label: '显示全部'
              }, {
                value: '1',
                label: '只显示列表'
              }],
              selvalue: '0',
              value7:[new Date(2000, 11, 10), new Date(2000, 11, 11)],
                pickerOptions2: {
                  shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                          const end = new Date();
                          const start = new Date();
                          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                          picker.$emit('pick', [start, end]);
                        }
                      }, {
                        text: '最近一个月',
                        onClick(picker) {
                          const end = new Date();
                          const start = new Date();
                          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                          picker.$emit('pick', [start, end]);
                        }
                      }, {
                        text: '最近三个月',
                        onClick(picker) {
                          const end = new Date();
                          const start = new Date();
                          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                          picker.$emit('pick', [start, end]);
                        }
                      }]
                    },
             
            }
        },
        methods:{
         
        },
          created(){
               document.title="简乐互动问卷调查系统"
              },
        mounted(){
              const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.htHeight = window.screenHeight-121
                })()
            }
           console.log(document.body.clientHeight);
        }, watch: {
            htHeight (val) {
                this.htHeight = val
            }
        },
         components: {
		      indexheader,
		      echarts,
		      htside,
		      htstatsel,
		      htstatinput,
		  }
        
      }
</script>
<style lang="sass" scoped>
 .editContent{
 
  overflow:hidden;
 }
 .creatcontent{
  overflow-y:hidden !important;
 }
 .ht-yangben{
   	width:100%;
   	margin:auto;
    background:white;
   	min-height:300px;
    max-height:96%;
    max-width:1000px;
   	margin:auto;
   	margin-top:20px;
   	margin-bottom:50px;
   
    overflow:auto;
 }
</style>