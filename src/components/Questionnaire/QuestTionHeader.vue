<template>
  <div class="creatHeader">
    	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <router-link to="/create"><el-menu-item index="1">编辑问卷</el-menu-item></router-link>
          <el-menu-item index="2" @click="settingFunc">设置</el-menu-item>
           <router-link :to="{path:'/analysis',query: {'id':tjid}}"><el-menu-item index="3" v-if="type==1">统计分析</el-menu-item></router-link>
          
        </el-menu>
        <el-menu class="el-menu-right" mode="horizontal" @select="handleSelect">
          <router-link :to="{path:'/user',query:{'id': tjid}}"><el-menu-item index="1"  v-if="type==1">预览</el-menu-item></router-link>
          <router-link to="/index"><el-menu-item index="2"  v-if="type==1"><i class="el-icon-tickets"></i>文本编辑</el-menu-item></router-link>
           <router-link to="/index"><el-menu-item index="3"  v-if="type==1">打印</el-menu-item></router-link>
        </el-menu>
          <el-button type="primary" size="small" class="startback" v-if="showBtn" @click="startBack">开始回收</el-button>
    <setting :visible="visible" @hideVisible="showVisible"/>
   </div>
</template>
<script type="text/javascript">
  import echarts from 'echarts'
   import setting from './Setting.vue'
    export default {
        name: '',
        data () {
            return {  
             activeIndex:"1",
             visible:false,
             editType:0,
             tjid:0,
            }
        },
         props:["showBtn","type"],
         methods:{
          	handleSelect(key, keyPath) {
                    console.log(key, keyPath);
                  },
            settingFunc(){
                 this.visible=true;
            },
            showVisible(){
              this.visible=false;
            },
            startBack(){
                
                  this.$emit("editData", this.editType);
               
            }

        },
        mounted(){
           this.tjid=this.$route.query.id;
           
        },
         components: {
          setting
         }
        
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