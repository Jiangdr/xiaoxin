<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="vue-content">
   <questionHeader  v-bind:showBtn="reslen" @editData="getChildIt" :type="type"></questionHeader>
   <div class="editContent" :style="'height:'+ htHeight+'px'">
   <htside  v-on:childToParentMsg="showChildToParentMsg" ></htside>
   
    <div class="creatcontent" >
    	<div class="ht-content">
    		<htuploadimg v-bind:parentToChildTitle="headername" @childToParentData="getChildimg1"/>
    		 <hteditheader @childToParentData="getChildHeader"/>
    		<draggable v-model="items" :move.stop="getdata" @update="datadragEnd">
		      <transition-group>
				<li :is="item.component" v-for="(item,index) in items" :key="item.id" v-bind:parentToChild="index" 
				v-on:childToParentId="DelchildToParentId" @childToParentData="getChildData" ref="editChild" ></li>
		      </transition-group>
		    </draggable>
        <el-button @click='getChildIt' >测试数据</el-button>
		    <htuploadimg v-bind:parentToChildTitle="footname" @childToParentData="getChildimg2"/>
    	</div>
    </div>
   </div>
  </div>
</template>
<script >

  import questionHeader from "./QuestTionHeader.vue"
  import draggable from 'vuedraggable'
  import htuploadimg from "./HtUploadImg.vue"
  import hteditheader from "./HtEditHeader.vue"
  import htside from "./CreatLeft.vue"
  import htradio from "./HtRadio.vue"
  import htcheckbox from "./HtCheckbox.vue"
  import htinput from "./HtInput.vue"
  import httextarea from "./HtTextarea.vue"
  import htrank from "./HtRank.vue"
  import { getajax } from '../../ajax';
 const dataget=getajax.ajaxFun
    export default {
        name: '',
        data () {
            return {  
             activeIndex:"1",
             htHeight:document.body.clientHeight-121,
             items: [],
             headername:"点击或拖拽上传头部图片",
             footname:"点击或拖拽上传底部图片",
             vlength:0,
             itemData:[],
             getIt:false,
             ajaxData:[],
             img1:'',
             img2:'',
             naireName:'问卷标题',
             desc:'此处输入问卷简介',
             reslen:false,
             type:0
            }
        },
          created(){
               document.title="简乐互动问卷调查系统"
              },
        methods:{
            getdata (evt) {
            	/*evt.preventDefault=true;//阻止默认事件（原生方法）
              evt.stop;//阻止冒泡（原声方法）*/
           
            },
            datadragEnd (evt) {
    

            },
        add(component) {
		      this.items.push({
		        'component': component,
            'id':this.vlength
		      })
		      
          if(this.items.length==undefined||this.items.length==0){
            this.reslen=false
          }else{
            this.reslen=true;
          }
		    },
		    showChildToParentMsg(coms){
         this.vlength++;
		    	this.add(coms)
		    },
		    DelchildToParentId(id){
		  
          this.items.splice(id,1);
         
          if(this.items.length==undefined||this.items.length==0){
            this.reslen=false
          }
          else{
            this.reslen=true;
          }
		    },
        getChildData(data){
            this.itemData.push(data)
           
        },
        getChildIt(data){
           console.log("提交")
          if(this.$refs.editChild.length==undefined||this.items.length==0){
            this.reslen=false;
            return
          }else{
             this.reslen=true;
          let reslen=this.$refs.editChild.length;
        
          let temp=[];
          for(let i=0;i<reslen;i++){
           temp.push(this.$refs.editChild[i].creatIt()); 
            
          }

           this.itemData=temp;
          this.itemData.sort(this.compare('id'))
        
          //console.log(this.itemData,"itemdata")
          this.ajaxData={"naireName":this.naireName,"dsc":this.desc,"pic":[this.img1,this.img2],"content":this.itemData};
          dataget("post", this.ajaxData," ","/qnaire/Quesnaire/create",this.getAjaxSuccess);
          }
        
        },
      getAjaxSuccess(res){
       console.log("ajax请求返回值:",res)
         if(res.flag==1){
              this.$message({
                showClose: true,
                message: res.msg,
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
        getChildimg1(data){
          this.img1=data;
        },
         getChildimg2(data){
          this.img2=data;
        },
        getChildHeader(data){
          console.log(data);
          this.naireName=data.title;
          this.desc=data.beizhu;
        },
       compare(property){//数组排序
       
        return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        //console.log("value1",value1)
        return value1 - value2;
       }
     }
          
        },
        mounted(){
           const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.htHeight = window.screenHeight-121
                })()
            }
            console.log(document.body.clientHeight)
        },
        components: {
		      questionHeader,
		      draggable,
		      htside,
		      htuploadimg,
		      hteditheader,
		      'ht-radio':htradio,
		      'ht-checkbox':htcheckbox,
		      'ht-textarea':httextarea,
		      'ht-input':htinput,
          'ht-rank':htrank
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
   	display:flex;
   }
   .ht-content{
   	width:100%;
   	max-width:640px;
   	border:1px solid #ccc;
   	min-height:300px;
   	margin:auto;
   	margin-top:50px;
   	margin-bottom:50px;
   }
</style>