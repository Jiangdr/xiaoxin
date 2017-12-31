<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div class="yangbenItem">
   <div class="wenjuanTimu">
     <p class="title">问卷题目</p>
     <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="文本答案"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="提交时间"
        >
      </el-table-column>
    </el-table>
    <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next"
          :total="tableData.length"
          class="page"
          >
        </el-pagination>
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
              currentPage:1,
              pagesize:2,
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
           
            }
        },
        methods:{
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize=val;
          },
            handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
          }
            
        },
        mounted(){
          
           
        },
         components: {
		     
		  
		  }
        
      }
</script>
<style lang="sass" scoped>
 
 

 
</style>