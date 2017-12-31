<template>
	<div class="controlItem " >
		<div class="editControl" :class="{'hide':show}">
			<div class="editControl-div">
			   <el-input placeholder="请输入题目" v-model="title" >
			    <template slot="prepend" >多选题目</template>
			   </el-input>
			</div>
			<div class="editControl-div">
			   <el-input placeholder="请输入备注"  v-model="beizhu">
			    <template slot="prepend">多选备注</template>
			   </el-input>
			</div>
			<div class="editControl-div">
			 <div class="editControl-div" v-for="(obj,index) in numsource">
			   <el-input :placeholder="'选项'+parseInt(index+1)" v-model="obj.text" >  
				      <el-button slot="append" @click="deleteSelect(index)"><i class="el-icon-delete"></i></el-button>
				</el-input>

			</div>
			<p class="creatinfor" @click="creatSelect">新建选项</p>
			  <!-- <el-button type="info" class="creatinfor" @click="creatSelect">新建选项</el-button> -->
			</div>
			<el-button-group class='creatBtnGroup'>
			  <el-button type="primary" @click="creatIt">确定</el-button>
			  <el-button  class="cancleCreat" @click="delFunc(parentToChild)">取消</el-button>
			</el-button-group>
		</div>
		<div class="showControl" :class="{'hide':!show}">
			  <div class="rightedit" style="display:">
			  	 <el-tooltip class="item" effect="dark" content="编辑" placement="right">
			      <p class="toeditItem" @click="toEdit"><i class="el-icon-edit"></i></p>
			    </el-tooltip>
			     <el-tooltip class="item" effect="dark" content="删除" placement="right">
			      <p class="todelItem" @click="delFunc(parentToChild)"><i class="el-icon-delete"></i></p>
			    </el-tooltip>
			 </div>
			<p class="showTitle">题目{{parentToChild+1}}、{{title}}</p>
			<p class="showbeizhu" v-if="beizhu!=''">{{beizhu}}</p>
			<el-checkbox-group v-model="checkList">
			    <el-checkbox :label="index" v-for="(obj,index) in numsource">{{obj.text}}</el-checkbox>
			   
			  </el-checkbox-group>
		</div>
	</div>
</template>
<script >
 
    export default {
        name: '',
        data () {
            return {  
            	title:'',
            	beizhu:'',
                numsource:[{text:'选择1'},{text:'选择2'}],
                  selectTrue:false,
                  checkList:[0],
                  show:false,
            }
        },
         props:["parentToChild","editData"],
        methods:{
        	toEdit(){
        		 this.show=false
        		//编辑当前内容
        	},
        	creatSelect(){
                console.log(this.numsource.length)
                console.log( this.numsource)
                let len=this.numsource.length;
                let temp={text:""}
                this.numsource.push(temp)
        	},
        	deleteSelect(indexs){
        		if( this.numsource.length>2){
        			  this.numsource.splice(indexs,1);
                console.log( this.numsource)
        		}
        		else{
        			 this.$message({
			          showClose: true,
			          message: '至少保留两个选项',
			          type: 'warning'
			        });
        		}
        	},
        	delFunc(index){
                  this.$emit("childToParentId", index);
        	},//删除当前组件
        	creatIt(){
        		for(let i=0;i<this.numsource.length;i++){
        			if(this.numsource[i].text==''){
        				this.selectTrue=false;
        				this.$message({
				          showClose: true,
				          message: '选项输入框不能为空',
				          type: 'error'
				        });
        				return
        			}
        			else{
        				this.selectTrue=true;

        			}
        			
        		}
                 if(this.title==''){
                 	 this.$message({
			          showClose: true,
			          message: '多选题目不能为空',
			          type: 'error'
			        });
                      return false;
                 
        		}
        		else{
        			this.show=true;
                  return  this.getData();
        		}
        	},
           getData(){
                 let itemData={"title":this.title,
                         "mark":this.beizhu,
                         "type":1,//类型 0单选 1多选 2单行 3多行 4排序
                         "option":this.numsource
                     }
                     let data={"id":parseInt(this.parentToChild),"show":this.show,"data":itemData}
                     this.$emit("childToParentData", data);
                    // console.log("子组件内容",data[2].title)
                    return data;
            }
        },
         watch:{
          parentToChild:function(ole,news){
               this.getData();
          }
        },
        mounted(){
          console.log("editData",this.editData)
            if(this.editData!=undefined){
               this.title=this.editData.title;
               if( this.editData.mark!=undefined){
                 this.beizhu=this.editData.mark;
               }
               this.numsource=this.editData.option
               }
        },
      
        
      }
</script>
<style lang="sass" scoped="">
	
</style>