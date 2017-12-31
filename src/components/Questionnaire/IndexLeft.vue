<template>
	<div class="indexLeft" >
		<div class="index-content" >
			
		  <el-menu class="el-menu-indexLeft" mode="vertical" @select="handleSelect"  :default-active="parentToChildIndex">
	           <router-link to="/analysis"><el-menu-item index="1" v-on:click="childToParent('ht-radio')">
	          	<img class="imgnormal" src="../../../static/img/huishou.png">
	          	<img class="imgacitve" src="../../../static/img/huishou1.png">
	          	<p>回收概况</p>
	          </el-menu-item></router-link>
	          <router-link to="/sample"> <el-menu-item index="2" v-on:click="childToParent('ht-checkbox')">
	          	<img class="imgnormal" src="../../../static/img/yangben.png">
	          	<img   class="imgacitve"src="../../../static/img/yangben1.png">
	          		<p>样本数据</p>
	          </el-menu-item>
	         </router-link>
	          <router-link to="/chart">
	          <el-menu-item index="3" v-on:click="childToParent('ht-input')">
	          	<img class="imgnormal" src="../../../static/img/tongji.png">
	          	<img  class="imgacitve" src="../../../static/img/tongji1.png">
	          	<p>图表统计</p>
	          </el-menu-item>
	      </router-link>
	         
        </el-menu>
		</div>
	</div>
</template>
<script >
	 export default {
       
        data () {
            return {  
                htHeight:'600'
            }
        },
          props:["parentToChildIndex"],
        methods:{
        	handleSelect(key, keyPath) {
                    console.log(key, keyPath);
                  },
	         childToParent(text){
	        this.$emit("childToParentMsg", text);
	      }
          
        },
        mounted(){
        },
     

        
      }
</script>
<style lang="sass" scoped>
 .el-menu-indexLeft{
 	background:white;
 	padding-top:40px;
 	.el-menu-item {
 		height:120px;
 		margin-top:0px;
 		position: relative;
 		img{
 			
 			margin-top:30px;
            padding:0px;
           position: absolute;
           left:50%;
           margin-left:-19px;

 		}
 		p{
 			margin:0px;
 			height:100px;
 			line-height:160px;

 		}
 	}
 	.imgacitve{display:none;}
 	.imgnormal{display:block}
 	.el-menu-item:hover .imgacitve{
 		display:block !important;
 	}
 	.el-menu-item:hover .imgnormal{
 		display:none !important;
 	}
 	.el-menu-item:hover {
 		background:rgb(246,247,249)
 	}
 	.is-active{
 		background:rgb(246,247,249);
 		.imgacitve{display:block !important;}
 		.imgnormal{display:none}
 	}
 }
</style>