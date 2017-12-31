<template>
 <el-dialog
  title="问卷设置"
  :visible.sync="visible"
  width="30%"
  center
  :before-close="handleClose">
  
    <table class="settingtable">
    	<tr><td width="100">显示设置</td><td width="80"><el-switch v-model="delivery"  active-color="#13ce66"
  inactive-color="#ff4949"></el-switch></td><td>答题过程可以回退</td></tr>
    	<tr><td></td><td><el-switch v-model="delivery"></el-switch></td><td>答题完成后显示结果</td></tr>
    	<tr><td>回收设置</td><td><el-switch  v-model="delivery" ></el-switch></td><td>设定回收结束时间</td></tr>
    	<tr><td></td><td><el-switch v-model="delivery"></el-switch></td><td>每个用户只能回答一次</td></tr>
    	<tr><td>投放设置</td><td><el-switch v-model="delivery"></el-switch></td><td>只在游戏中投放</td></tr>
    	<tr><td></td><td><el-switch v-model="delivery"></el-switch></td><td>只在微信中投放</td></tr>
    	<tr><td></td><td><el-switch v-model="delivery"></el-switch></td><td>在所有平台投放</td></tr>
    	<tr><td>奖品设置</td><td><el-switch v-model="delivery"></el-switch></td><td>提供奖品</td></tr>
    </table>
    
 
  <span slot="footer" class="dialog-footer">
   
    <el-button type="primary" @click="OkHandel">保 存</el-button>
     <el-button @click="CancelHandel">取 消</el-button>
  </span>
</el-dialog>
</template>
<script>
  export default {
    data() {
      return {
       delivery:false
      };
    },
     props:["visible"],
    methods: {
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
          	 this.CancelHandel()
          })
          .catch(_ => {});
      },
      CancelHandel(){
      	console.log("取消")
      	this.$emit("hideVisible", false);
      },
       OkHandel(){
      	console.log("确定");
      	this.$emit("hideVisible", false);
      }

    }
  };
</script>
<style lang="sass" scoped>
 .el-dialog__header{
 	padding:0px 20px 0 20px
 }
 .settingtable{
 	td{
 		height:30px;
 		line-height:30px;
 		text-align:left;
 		
 	}
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