<template>
  <div class="creatHeader">
    	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <router-link to="/create"><el-menu-item index="1">编辑问卷</el-menu-item></router-link>
          <router-link to="/index"><el-menu-item index="2">设置</el-menu-item></router-link>
           <router-link to="/analysis"><el-menu-item index="3">统计分析</el-menu-item></router-link>
          
        </el-menu>
        <el-menu class="el-menu-right" mode="horizontal" @select="handleSelect">
          
        </el-menu>
     <!-- <el-button type="primary" size="small" class="startback">开始回收</el-button> -->
   </div>
</template>
<script type="text/javascript">
  import echarts from 'echarts'
    export default {
        name: '',
        data () {
            return {  
             activeIndex:"3",
            }
        },
        methods:{
          	handleSelect(key, keyPath) {
                    console.log(key, keyPath);
                  }
        },
        mounted(){
           
        },
        
      }
</script>
<style lang="sass" scoped>
 .el-menu-demo{
 	background: white;
 	width: 400px;
 	height: 40px;
 	line-height: 40px;
 	.el-menu-item{
         height:40px;
         line-height:40px;
         font-size:16px;
         margin-top:5px;
         border-right:1px solid #ccc;
 	}
 	.el-menu-item:hover{
 		background-color:white;
 	}
 }
 .el-menu-right{
 	background: white;
 	width: 400px;
 	height: 40px;
 	line-height: 40px;
 	float:right;
 	margin-right:150px;
 	margin-top:-40px;
 	.el-menu-item{
         height:40px;
         line-height:40px;
         font-size:16px;
         margin-top:5px;
         
 	}
 	.el-menu-item:hover{
 		background-color:white;
 	}
 }

</style>