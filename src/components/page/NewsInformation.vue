<template>
  <div>
  	<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 栏目管理</el-breadcrumb-item>
                <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button-group>
			  <router-link to="/system" style="color:white"><el-button type="primary" icon="el-icon-arrow-left">添加内容
			  </el-button>
			  </router-link>
			  <el-button type="primary" @click="addClassfity">添加栏目</el-button>
			</el-button-group>
			 <el-table
			    :data="tableData.data.datas"
			    border
			    style="width: 100%">
			    <el-table-column
			      :prop="tableData.schemakey[index]"
			      :label="item"
			      v-for="(item,index) in tableData.schemaname"
			     >
			    <template slot-scope="scope" >
			    	<img class="1" :src="scope.row.piclog" style="width:100px;" v-if="tableData.schemakey[index]=='piclog'"/>
			    	<div class="3" v-else-if="tableData.schemakey[index]=='state'">
			    		<el-button v-if="scope.row.state==0" @click="activate(false)">激活</el-button>
			    		<el-button v-else type="info" @click="activate(true)">禁用</el-button>
			    	{{scope.row.state |getfilter}}
			    </div>
			    	<div class="3" v-else >{{scope.row[tableData.schemakey[index]]}} </div>
			    </template>   

			    </el-table-column>
			    
			    <el-table-column
			      label="操作"
			      >
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button  @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <AddClassfity :visibles="visible" v-on:callbackParent="getlisnten"></AddClassfity>
        </div>
  </div>
</template>
<script type="text/javascript">
import AddClassfity from './AddClassfity.vue'
import {getajax} from '../../js/ajax';
	 export default {
        data: function(){
          return {
          	tableData:[],
          	tableTitle:{},
          	visible:false,
          	sysdata:''
          }
        },
        mounted(){
          getajax.ajaxList("news.json","",this.getSucces)
       },
      components: {
            'AddClassfity': AddClassfity 
   		},
   		filters: {  
              getfilter(value) {  
            	if(value==0){
            		return "激活"
            	}
                else{
                	return "禁用"
                } 
            }  
        },  
      methods: {
	      handleClick(row) {
	        console.log(row);
	        this.$router.push({path: '/system', query: {sysdata: JSON.stringify(row)}});
	      },
	      getSucces(res){
	      	console.log('res',res)
	      	this.tableData=res;
	      	let data=res.schemaname;
	      	let keys=res.schemakey;
	      	let temp=[];
	      	for(let i=0;i<data.length;i++){
	      		let val=data[i];
	      		let key=keys[i];
	      		let obj={};
	      		obj[key]=val;
	      		temp.push(obj);
	      	}
      	  this.tableTitle={
      	  	"data":temp
      	  }
      		console.log('tableData', this.tableTitle)
      },
      addClassfity(){
      	this.visible=true;
      },
      getlisnten(text){
          console.log("返回到父组件的内容:",text);
          this.visible=false;
      }
     },
    }
</script>