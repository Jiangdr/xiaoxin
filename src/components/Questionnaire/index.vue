<template>
 
   <div class="vue-content">
   <div class="editContent" :style="'height:'+ htHeight+'px'"> 
    <el-row :gutter="100" class="showCardGroup">
    <el-col :xs="24" :sm="12" :md="6" v-for="(obj,index) in this.listData"  :key="index">
      <el-card class="box-card cardItem">
            <div class="blankItem"></div>
            <div class="editItem">
             <p class="backstaut">状态:
               <span class="caogao" v-if="obj.state=='0'">草稿</span>
               <span class="huishouing" v-if="obj.state=='1'">回收中</span>
               <span class="zanting" v-if="obj.state=='2'">暂停回收</span>
              <span class="hadback" v-if="obj.state=='3'">已回收</span>
             
            </p>
             <div class="getmore"><i class="el-icon-more" ></i>
               <div class="moreGroup"  >
                 <ul class="moreul">
                   <li class="moreli" @click="">开始回收</li>
                   <li class="moreli" @click="shareFunc(obj.id,obj.naireName)">分享问卷链接</li>
                   <li class="moreli" @click="exportxtFunc(obj.id,obj.naireName,obj.dsc,obj.content)">导出txt文档</li> 
                   <li class="moreli " @click="">
                    <div class="morepar">
                     <p class="morep">统计分析&nbsp;&nbsp;&nbsp;<i class="el-icon-arrow-right" style="float:right;line-height:32px;"></i></p>
                      <div  class="p-moreul">
                        <ul>
                           <router-link  :to="{path:'/analysis',query: {'id': obj.id}}"><li class="p-moreli" >在线统计</li></router-link>
                         <li class="p-moreli" @click="">导出excel</li>
                       </ul>
                      </div>
                    </div>
                     
                   </li>
                   <li class="moreli" @click="clearDataFunc(obj.id)">清空数据</li>
                   <li class="moreli" @click="GoEdit(obj.id)">编辑</li> 
                   <li class="moreli" @click="delFunc(obj.id,obj.naireName)">删除</li>
                   <li class="moreli" @click="getNewname(obj.id,obj)">重命名</li>
                 </ul>
               </div>
             </div>
             
              
            </div>
      </el-card>
      <div class="editItemTitle">
        <p class="wjTitle" v-if="obj.upName">{{obj.naireName}}</p>
        <el-input class="wjTitle" v-if="!obj.upName" v-model="obj.naireName" @blur="UpdataName(obj.naireName,obj)"></el-input>
        <p class="wjTime">{{obj.cTime|getTime}}</p>
      </div>
     
    </el-col>
    
  </el-row>
   </div>
          <share :visible="visible" @hideVisible="showVisible" :url="url" :shareid="shareid" :sharename="sharename"/>
          <exportxt :visible="txtvisible" @hideVisible="showtxtVisible":dsc="singdsc" :content="singcontent" :txtname="sharename" :txtid="shareid" />
  </div>
 
</template>
<script >
  import share from './Share.vue'
    import exportxt from './ExportTxt.vue'
  import { getajax } from '../../ajax';
  
 const dataget=getajax.ajaxFun
 const dataurl=getajax.resurl

    export default {
        name: '',
        data () {
            return {  
             htHeight:document.body.clientHeight-71,
              listData:[],
              visible:false,
              txtvisible:false,
              url:'',
              shareid:0,
              sharename:'',
              singdsc:'',
              singcontent:'',
             

            }
        },
          created(){
               document.title="简乐互动问卷调查系统"
              },
        methods:{
           showVisible(){
              this.visible=false;
               this.shareid=0;
              this.sharename='';
              this.url='';
              console.log("name:",this.sharename)
            },
          getList(){
            this.visible=false; 
            dataget("post",''," ","/qnaire/quesnaire/index ",this.getAjaxSuccess);
          },
         getAjaxSuccess(res){
          
           if(res.flag=='1'){
              
              for(let i=0;i<res.msg.naireInfo.length;i++){
                res.msg.naireInfo[i]["upName"]=true;
              }
               console.log("res",res)
               this.listData=res.msg.naireInfo;
           }
           else{
             this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              });
           }
         },
         delFunc(id,name){
           this.$confirm('你将删除问卷'+name+', 是否继续?', '删除问卷', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                 let data={"id":id}
                 dataget("post",data," ","/qnaire/quesnaire/delete",this.getAjaxDelSuccess);
              }).catch(() => {
                
              });
         
         },
         getAjaxDelSuccess(res){
          
          if(res.flag==1){
             this.getList();
             this.$message({
                showClose: true,
                message: "删除成功",
                type: 'success'
              });
           }
             else if(res.flag==2){
               this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                  });
              this.$router.push('/login');
            }
           else{
             this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              });
           }
         },
         GoEdit(id){
           this.$router.push({path: '/edite', query: {"id": id}})
         },
         //清空数据
         clearDataFunc(id){
              this.$confirm('你将清除本问卷所有数据, 是否继续?', '清除数据', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '清除成功暂未开通!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '清除成功暂未开通'
                });
              });
         },
         shareFunc(id,name){
          //分享问卷
              this.visible=true;
            
              this.shareid=id;
              this.url= dataurl()+"?id="+id;
              this.sharename=name;
         },
         exportxtFunc(id,name,dsc,data){
              this.shareid=id;
              this.sharename=name;
              this.singdsc=dsc;
              this.singcontent=JSON.parse(data);
              this.txtvisible=true;
              console.log("singcontent",data)
         },
         showtxtVisible(){
          this.txtvisible=false;
             this.shareid='';
              this.sharename='';
              this.singdsc='';
              this.singcontent='';
         },
         // backFunc(res){
         //  console.log(res)
         // },

         getNewname(id,name){
           this.shareid=id;
             name.upName=false
          
            // console.log("新名字12",this.shareid, name.upName)
         },
         UpdataName(newnames,status){
          status.upName=true;
            console.log("新名字",this.shareid,newnames,status.upName)
            

         }
        },
        mounted(){
           const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.htHeight = window.screenHeight-71
                })()
            }
            //this.htHeight= document.body.clientHeight-71;
            //console.log(document.body.clientHeight)
             this.getList();
        },
        filters: {  
          getTime(value) {  
             
              return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
            }  
        },components: {
          share,
          exportxt
         },
          watch: {
            htHeight (val) {
                this.htHeight = val
            }
        }
       

        
      }
</script>
<style lang="sass" scoped>
 .editContent{
  overflow-y:auto;
 }
  .moreGroup{
          width: 140px;
          height: 270px;
         box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
          position: absolute;
          top: 40px;
          z-index: 9999;
          right: -40px;
          display:none;
        }
         .p-moreul{
          display:none;
         }
  .getmore{
    height:32px;
    margin-top:8px;
  }

    .getmore:hover .moreGroup{
        display: block;
      }
    
      .morepar:hover .p-moreul{
        display:block
      }

 
</style>