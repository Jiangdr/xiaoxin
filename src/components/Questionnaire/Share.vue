<template>
 <el-dialog
  title="分享问卷"
  :visible.sync="visible"
  width="30%"
  center
  :before-close="handleClose">
  <p class="pTitle">回收链接</p>
  <div class="lianjie">
    <el-input v-model="url" disabled></el-input>
    <el-button
     v-clipboard:copy="url"
     v-clipboard:success="onCopy"
     v-clipboard:error="onError">复制</el-button>
     <a target="_blank" :href="'#/user?id='+shareid"><el-button>打开</el-button></a>
  </div>
  <p class="pTitle" style="float:left">社交分享</p>
  <div class="lianjie">
    <div class="bdsharebuttonbox bdshare-button-style2-32" style="height:50px;">
     
        <a href="javascript:" class="bds_weixin" data-cmd="weixin"style="background:url('../../../static/img/wechat.png') no-repeat;background-size:100% 100%;margin:0 0 0 35%;height:50px;width:60px;" title="分享到微信"></a>
      <a href="javascript:" class="bds_tsina" data-cmd="tsina" style="background:url('../../../static/img/weibo.png') no-repeat;background-size:100% 100%;margin:0 0 0 5%;height:50px;width:60px;" title="分享到新浪微博"></a>
      <a href="javascript:" class="bds_sqq" style="background:url('../../../static/img/qq.png') no-repeat;background-size:100% 100%;margin:0 0 0 5%;height:60px;width:50px;" data-cmd="sqq" title="分享到QQ好友"></a>
    </div>
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
     props:["visible","url","shareid","sharename"],
     methods: {
     handleClose(done) {
       
          	 this.CancelHandel()
        
      },
      CancelHandel(){
      	//console.log("取消")
       //this.$router.push('/readme')

      	this.$emit("hideVisible", false);
         window.location.reload(); 
   
      },
       OkHandel(){
      	//console.log("确定");
        //this.$router.push('/index')
      	this.$emit("hideVisible", false);
      },
      onCopy(e){
        this.$message({
                    showClose: true,
                    message: "复制成功",
                    type: 'success'
                  });
        //console.log(e)
       

      },
      onError(e){
        this.$message({
                    showClose: true,
                    message: "复制失败",
                    type: 'success'
                  });
        console.log(e)
      },
      drawPie(text,names){
       let that=this
        console.log("text:",text)

        window._bd_share_config={
         
                  "common":{
                    "bdText":names,
                    "bdMini":"2",
                    "bdMiniList":false,
                    "bdPic":"",
                    "bdUrl":that.url,
                    "bdStyle":"2",
                     onBeforeClick: function(cmd,config){
                      console.log("textsssss:",that.url,text);
                      return {
                        bdUrl: that.url
                      }
                    }
                  },
                  "share":{
                     "bdSize":"32",
                     "bdUrl":"http://192.168.1.216:8081/#/user?id="+text,
                  }

                
              };
               const s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
                    document.body.appendChild(s);
              console.log("方法内",window._bd_share_config)
                  
      }

    },
    
    mounted(){
      let urls=this.shareid
      let names=this.sharename
      //console.log("urls:",urls)
      
                   
       
       console.log(urls,names)

       this.invt = setTimeout(() => {
               //this.drawPie(this.shareid,this.sharename)
                }, 10)  
    },
    watch:{
      url:function(){

          this.$nextTick(() => {
                 this.drawPie(this.shareid,this.sharename)
            })

           console.log("watche",window._bd_share_config,this.shareid,this.sharename)   
      },


    }
  };
</script>
<style lang="sass" scoped>
 .el-dialog__header{
   height:50px !important;

  .el-dialog__title{
    line-height:40px;
    text-align:left
  }
 }.bds_sqq{
             background:url('../../../static/img/qq.png') no-repeat ;
 }
 .pTitle{
  text-align:left;
  height:40px;
  line-height:40px;
  font-size:16px;
  margin:0;
 }
 .lianjie{
  width:100%;
  float:left;
  height:40px;
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