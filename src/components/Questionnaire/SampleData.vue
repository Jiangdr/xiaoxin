<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div class="vue-content">
   <indexheader ></indexheader>
	   <div class="vue-content">
	   <div class="editContent" :style="'height:'+ htHeight+'px'"> 
	   <htside   :parentToChildIndex="activeindex"></htside>
	    <div class="creatcontent" >
    	 <div class=" ht-yangben">
        <div class="yangben-header">
              <p class="wjTitle">问卷标题:&nbsp;<span>{{title}}</span></p>
         <div class="editheader">
          <ul>
              <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <li class="iconli"><img src="../../../static/img/refresh.png" style="margin-top:5px;"></li>
             </el-tooltip>
             <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <li class="iconli"><i class="el-icon-delete"></i></li> </el-tooltip>
            <li class="selectli">
               <el-select v-model="selvalue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
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
         <div class="tableDiv">
           <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    border
                    style="width: 100%;height:120%"
                    
                    >
                     <el-table-column
                      fixed
                    type="selection"
                    width="55">
                  </el-table-column>
                   <el-table-column
                    fixed
                    label="查看"
                    width="100">
                    <template slot-scope="scope">
                     <img @click="handleLook(scope.$index, scope.row)" src="../../../static/img/look.png">
                    </template>
                  </el-table-column>
                     <el-table-column
                    fixed
                    label="编号"
                    width="100"
                    type="index"
                    >
                   
                  </el-table-column>
                    <el-table-column 
                      fixed
                      :prop="tableHeader[0].key"
                      :label="tableHeader[0].name"
                      width="115"
                      >
                    </el-table-column>
                     <el-table-column 
                      v-if="index>0"
                      :prop="obj.key"
                      :label="obj.name"
                      width="120"
                      v-for="(obj,index) in tableHeader"
                      >
                    </el-table-column>    
        </el-table>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2,10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next"
          :total="tableData.length"
          class="page"
          >
        </el-pagination>
    </div>
    	 </div>
		</div>
	   </div>
	  </div>
</div>
 
</template>
<script type="text/javascript">

  import indexheader from "./IndexHeader.vue"
   import htside from "./IndexLeft.vue"
    export default {
        name: '',
        data () {
            return {  
             htHeight:document.body.clientHeight-121,
             activeindex:'2',
             title:'问卷调查1',
             currentPage:1,
              pagesize:2,
              options: [{
                value: '0',
                label: '导出Excel'
              }, {
                value: '1',
                label: '原始数据'
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
               tableHeader: [
               {name: '日期',key: 'date'},{name: '日期',key: 'date1'},{name: '日期',key: 'date2'},{name: '日期',key: 'date3'},{name: '日期',key: 'date4'},{name: '日期',key: 'date5'}],
            tableData: [
            {date: '2016-05-03'},
             {date1: '2016-05-03',date2: '2016-05-03'},
              {date2: '2016-05-03'},
               {date3: '2016-05-03'},
                {date4: '2016-05-03'},
                 {date5: '2016-05-03'},
            ],
            }
        },
        methods:{
          handleLook(index,row){
            console.log(index,row,"数据")
              },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize=val;
          },
            handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
          }
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
           
        },
        
       watch: {
            htHeight (val) {
                this.htHeight = val
            }
        },
         components: {
		      indexheader,
		    
		      htside,
		  }
        
      }
</script>
<style lang="sass" scoped>
 .editContent{
 
  overflow:hidden;
 }
 .creatcontent{
  overflow:hidden;
 }
 .ht-yangben{
   	width:98%;
   	margin-left:1%;
    background:white;
   	min-height:300px;
    max-height:96%;
   	margin:auto;
   	margin-top:20px;
   	margin-bottom:50px;
    overflow-y:auto;
    overflow-x:hidden;
 }
</style>