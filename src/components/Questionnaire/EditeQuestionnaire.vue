<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="vue-content">
   <questionHeader  v-bind:showBtn="reslen" @editData="getChildIt" :type="type"></questionHeader>
   <div class="editContent" :style="'height:'+ htHeight+'px'">
   <htside  v-on:childToParentMsg="showChildToParentMsg" ></htside>
   
    <div class="creatcontent" >
    	<div class="ht-content">
    	
    		 <htuploadimg v-bind:parentToChildTitle="headername" @childToParentData="getChildimg1" :imgurl="JSON.parse(datasource.pic)[0]"/>
    		 <hteditheader @childToParentData="getChildHeader" :headerName="datasource.naireName" :headerbz="datasource.dsc"/>
    		<draggable v-model="items" :move.stop="getdata" @update="datadragEnd">
		      <transition-group>
        				<li :is="item.component" v-for="(item,index) in items" :key="item.id" v-bind:parentToChild="index" 
        				v-on:childToParentId="DelchildToParentId" @childToParentData="getChildData" ref="editChild" :editData="item.data.data" ></li>
		      </transition-group>
		    </draggable>

            <!-- <div v-for="(obj,index) in JSON.parse(datasource.content)">
             
             <ht-radio  :editData="obj.data" v-if="obj.data.type==0"/>
             <ht-checkbox :editData="obj.data" v-if="obj.data.type==1"/>
             <ht-input :editData="obj.data" v-if="obj.data.type==2"/>
             <ht-textarea :editData="obj.data" v-if="obj.data.type==3"/>
             <ht-rank :editData="obj.data" v-if="obj.data.type==4"/>
                       </div> -->
          <!--   <el-button @click='getChildIt' >{{edid}}</el-button> -->
		    <htuploadimg v-bind:parentToChildTitle="footname" @childToParentData="getChildimg2" :imgurl="JSON.parse(datasource.pic)[1]"/>
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
             edid:'0',
             datasource:'',
             type:1
            }
        },
        created(){
               document.title="简乐互动问卷调查系统"
              },
        methods:{
            getdata (evt) {
            	/*evt.preventDefault=true;//阻止默认事件（原生方法）
              evt.stop;//阻止冒泡（原声方法）*/
             console.log(evt.draggedContext.element.id)
            },
            datadragEnd (evt) {
    

            },
        add(component) {
		      this.items.push({
		        'component': component,
            'id':this.vlength,
            'data':'',
		      })
		      console.log("sasa",this.items)
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
		    	console.log("删除之前的完整数据",id,this.items)
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
            console.log("datachilde",this.itemData);

        },
        getChildIt(data){
        	console.log("items",this.items)
          if(this.$refs.editChild.length==undefined||this.items.length==0){
            this.reslen=false;
            return
          }else{
             this.reslen=true;
          let reslen=this.$refs.editChild.length;
          //console.log(this.$refs.editChild)
          let temp=[];
          for(let i=0;i<reslen;i++){
           temp.push(this.$refs.editChild[i].creatIt()); 
          // console.log( "shuju循环:",this.$refs.editChild[i].creatIt())    
          }
         this.itemData=temp;
          this.itemData.sort(this.compare('id'))
         //console.log(this.itemData,"itemdata")
          this.ajaxData={"id":this.editid,"naireName":this.naireName,"dsc":this.desc,"pic":[this.img1,this.img2],"content":this.itemData};
          dataget("post", this.ajaxData," ","/qnaire/quesnaire/save",this.getAjaxSuccess);
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
        onload(){
        	 let data={"id":this.edid}
        	 dataget("post", data," ","/qnaire/quesnaire/edit ",this.getLoadSuccess);
        	},
        getLoadSuccess(res){
        	 if(res.flag==1){
            this.editid=res.msg.id
              this.datasource=res.msg;
              let itme=[];
              this.items=[];
              let das=JSON.parse(this.datasource.content)
              for(let i=0;i<das.length;i++){
                if(das[i].data.type==0){
                 itme.push({
                  "component":"ht-radio",
                     "id":i+1,
                     "data":das[i]
                 }
                     
                     )
                }
                else if(das[i].data.type==1){
                  
                  itme.push({
                    'component':"ht-checkbox",
                    'id':i+1,
                     "data":das[i]
                  });
                }
                 else if(das[i].data.type==2){
                  itme.push({
                     'component':"ht-input",
                    'id':i+1,
                     "data":das[i]
                    }
                    );
                }
                 else if(das[i].data.type==3){
                  itme.push({
                    'component':"ht-textarea",
                    'id':i+1,
                     "data":das[i]
                  }
                    );
                }
                 else if(das[i].data.type==4){
                  itme.push({
                     'component':"ht-rank",
                    'id':i+1,
                     "data":das[i]
                  }
                    );
                }
              }
              this.items=itme;
              this.vlength=JSON.parse(this.datasource.content).length;
              this.reslen=true;
            
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
      compare(property){//数组排序
       // console.log("property",property)
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
            this.edid=this.$route.query.id;
            this.onload();
        },
        
       watch: {
            htHeight (val) {
                this.htHeight = val
            }
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