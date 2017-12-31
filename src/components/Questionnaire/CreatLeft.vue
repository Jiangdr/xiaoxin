<template>
	<div class="creatLeft" >
		<div class="creatLeft-content" >
			<el-button-group>
			  <el-button type="primary" icon="el-icon-arrow-left">题目控件</el-button>
			  <el-button type="primary">问卷大纲</el-button>
			  <el-button type="primary">题库问题</el-button>
			</el-button-group>
		  <el-menu class="el-menu-creatLeft" mode="vertical" @select="handleSelect">
	          <el-menu-item index="1" v-on:click="childToParent('ht-radio')"><img src="../../../static/img/dx.png" /><p>单选题</p></el-menu-item>
	          <el-menu-item index="2" v-on:click="childToParent('ht-checkbox')"><img src="../../../static/img/dx1.png" /><p>多选题</p></el-menu-item>
	          <el-menu-item index="3" v-on:click="childToParent('ht-input')"><img src="../../../static/img/dh.png" /><p>单行文本题</p></el-menu-item>
	          <el-menu-item index="4" v-on:click="childToParent('ht-textarea')"><img src="../../../static/img/dh1.png" /><p>多行文本题</p></el-menu-item>
	          <el-menu-item index="5" v-on:click="childToParent('ht-rank')"><img src="../../../static/img/px.png" /><p>排序题</p></el-menu-item>
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
 .el-menu-creatLeft{
 	background:white;
 	margin-top:40px;
 	.el-menu-item {
 		height:40px;
 		line-height:40px;
 		border:1px solid #ccc;
 		margin-top:10px;
 		text-align:left;
 		img{
 			margin-top:10px;
 			float:left;
 			display:block;
 		}
 		p{
 			float:left;
 			margin:0;
 			padding:0 0 0 15px;
 		}
 	}
 }
</style>