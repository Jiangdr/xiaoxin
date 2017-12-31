<template>
 <el-dialog
  title="导出TXT文本"
  :visible.sync="visible"
  width="30%"
  center
  :before-close="handleClose">
 
  <div class="lianjie">
    <div class="txtcontent">
      <div class="txtnei">
      <p style="text-align:left">{{txtname}}</p>
       <p style="text-align:left">{{dsc}}</p>
       <div class="txtItem" v-for="(obj,index) in content" :key="index">
         <p style="text-align:left">{{parseInt(obj.id)+1}}.{{obj.data.title}}[{{obj.data.type | getType}}]</p>
         <p style="margin:0;text-align:left" v-if="obj.data.type!=3&&obj.data.type!=2" v-for="item in obj.data.option">{{item.text}}</p>
       </div>
       </div>
    </div>

    <el-button type="success" style="margin:20px 0 0 0">导出TXT</el-button>
     
  </div>
  <span slot="footer" class="dialog-footer">
   
    <!-- <el-button type="primary" @click="OkHandel">保 存</el-button>
     <el-button @click="CancelHandel">取 消</el-button> -->
  </span>
</el-dialog>
</template>
<script>
  export default {
    data() {
      return {
       delivery:false,
       message:"胡涛"
      };
    },
     props:["visible","dsc","content","txtname","txtid"],
     methods: {
     handleClose(done) {
       
          	 this.CancelHandel()
        
      },
      CancelHandel(){
      	//console.log("取消")
       //this.$router.push('/readme')

      	this.$emit("hideVisible", false);
       //  window.location.reload(); 
   
      },
      getTxtData(){
      console.log(this.content)
       console.log(this.txtname)
        console.log(this.dsc)
      }
     
      
    

    },
    
    mounted(){
      console.log(this.content)
       console.log(this.txtname)
        console.log(this.dsc)
     this.getTxtData()
      
    },
   filters: {  
              getType(value) {  
              if(value==0){
                return "单选"
              }
              else if(value==1){
                return "多选"
              }
              else if(value==2){
                return "单行文本"
              }
              else if(value==3){
                return "多行文本"
              }
                else{
                  return "排序"
                } 
            }  
        },

  };
</script>
<style lang="sass" scoped>
 .el-dialog__header{
   height:50px !important;

  .el-dialog__title{
    line-height:40px;
    text-align:left
  }
 }
 .pTitle{
  text-align:left;
  height:40px;
  line-height:40px;
  font-size:16px;
  margin:0;
 }
 .lianjie{
  width:96%;
  margin:0 2% 0 2%;
  float:left;
  height:400px;

 .txtcontent{
  width:100%;
  float:left;
  height:350px;
  overflow:hidden;
  border-bottom:1px solid #ccc;
  .txtnei{
    width:894px;
    height:350px;
    overflow:auto;

  }
 }
 }
 .el-input{
  width:60%;
  float:left;
 }
 .el-switch{
 	
 	div{
 		color:red;
 		width:50px  !important;
 		span{
 			display:none !important;
 		}
 	}
 }

 
</style>