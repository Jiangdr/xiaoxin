<template>
	<div class="controlItem " >
		<div class="editControl" >
			<div class="editControl-div editheader">
			   <el-input placeholder="请输入问卷标题" v-model="title" @change="gettextContent" v-on:blur="changeCount">
			   </el-input>
			</div>
			<div class="editControl-div editheader">
			   <el-input placeholder="此处输入问卷简介" type="textarea"  v-model="beizhu" @change="gettextContent" v-on:blur="changebz">
			   
			   </el-input>
			</div>
		</div>
	
	</div>
</template>
<script >
 
    export default {
        name: '',
        data () {
            return {  
            	title:'问卷标题',
            	beizhu:'此处输入问卷简介',
                 textarea:'',
                  show:false,
            }
        },
         props:["parentToChild","headerName","headerbz"],
        methods:{
           gettextContent(){
            if(this.title==''){
                   this.$message({
                    showClose: true,
                    message: '问卷标题不能为空',
                    type: 'error'
                  });
                  
            }
            else{
              let data={
                "title":this.title,
                "beizhu":this.beizhu
              }
                this.$emit("childToParentData", data);
              }
            
           },
           changeCount(){
            if(this.title==''){
                  
                   this.title="问卷标题"
            }
            let data={
                "title":this.title,
                "beizhu":this.beizhu
              }
                this.$emit("childToParentData", data);
           },
           changebz(){
            let data={
                "title":this.title,
                "beizhu":this.beizhu
              }
                this.$emit("childToParentData", data);
           }
  
        },
        mounted(){
          if(this.headerName!=undefined){
            this.title=this.headerName;
          }
          if(this.headerbz!=undefined){
            this.beizhu=this.headerbz;
          }
          this.changeCount();

        },
      
        
      }
</script>
<style lang="sass" scoped>
	
</style>