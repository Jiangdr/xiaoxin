<template>
	<div class='bigclass'>
	<div class="content"  v-cloak>
	
	<img class="banner" :src="pic[0]" v-if="pic[0]!=undefined&&pic[0]!=''">
	 <div class="formdiv" :style="{backgroundImage: 'url('+ pic[1] +')'}">
    <form id="wenjuan">
    <div class="dycontent">
        
     <h2 class="biaoti" v-text="datasource.naireName"></h2>
     <p class="jianjie" v-text="datasource.dsc"></p>
	<div v-for="(obj,index) in datasources">
       <div class="radio item" v-if="obj.data.type==0" :key="index">
        <p class="title">{{index+1}}.{{obj.data.title}}</p>
         <label class="label" v-for="(item,indexs) in obj.data.option"><input v-model=" obj.data.checked"  type="radio" :name="index"  :value="item.text" >&nbsp;&nbsp;{{item.text}}<br></label>
        
      </div>
       <div class="checkbox item" v-if="obj.data.type==1" :key="index">
        <p class="title">{{index+1}}.{{obj.data.title}}</p>
          <label class="label" v-for="(item,indexs) in obj.data.option"><input v-model=" obj.data.checked"  type="checkbox" :name="index"  :value="item.text" >&nbsp;&nbsp;{{item.text}}<br></label>
      </div>
      <div class="rank item" v-if="obj.data.type==4" :key="index">
        <p class="title">{{index+1}}.{{obj.data.title}}</p>
 
	<draggable v-model="obj.data.checked" :move.stop="getdata" @update="datadragEnd">
		 <transition-group>
        	<div v-for="(element,ind) in obj.data.checked" :key="element"  class="list-complete-item">
				<div class="styleclass dargDiv">{{ind+1}}.{{element}}</div>
			</div>
		 </transition-group>
	</draggable>
         
      </div>
       <div class="input item" v-if="obj.data.type==2" :key="index">
       <p class="title">{{index+1}}.{{obj.data.title}}</p>
         <input type="text" v-model=" obj.data.checked":name="index">
      </div>
       <div class="textarea item" v-if="obj.data.type==3" :key="index">
        <p class="title">{{index+1}}.{{obj.data.title}}</p>
        <textarea class="texta" v-model=" obj.data.checked" :name="index"></textarea>
      </div>
  </div>
</div>
</form>
  <el-button @click="OkBtn" :disabled="disabled">提交</el-button>
      
      
     </div>
</div>
</div>
</template>
<script >
import draggable from 'vuedraggable'
  import { getajax } from '../../ajax';
 const dataget=getajax.ajaxFun
    export default {
        name: '',
        data () {
            return {  
            id:0,
           startTime:0,
           endTime:0,
           datasource:{},
           datasources:[],
           pic:[],
           sys:2,
           disabled:false,
            }
        },
         
        methods:{
           getdata (evt) {
            	/*evt.preventDefault=true;//阻止默认事件（原生方法）
              evt.stop;//阻止冒泡（原声方法）*/
             console.log(evt.draggedContext.element.id)
            },
            datadragEnd (evt) {
              console.log("end:",this.datasources)

            },
            getAjax(){
            	  let data={"id":this.id}
            	  dataget("post", data," ","/qnaire/front",this.getAjaxSuccess);
            	},
           getAjaxSuccess(data){
                 if(data.flag==1){
                     this.datasource=data.msg;
                     let tempdata=JSON.parse(this.datasource.content)
                    // this.datasources=JSON.parse(this.datasource.content)
                     this.pic=JSON.parse(data.msg.pic);
                     console.log("tempdata",tempdata)
                     for(let i=0;i<tempdata.length;i++){

                     	if(tempdata[i].data.type==0||tempdata[i].data.type==1){
                     		tempdata[i].data["checked"]=[];
                     		
                     	}
                     	else if(tempdata[i].data.type==2||tempdata[i].data.type==3){
                               tempdata[i].data["checked"]=[];
                     	}
                     	else if(tempdata[i].data.type==4){
                     		tempdata[i].data["checked"]=[];
                     		let tems=[];
                     		for(let j=0;j<tempdata[i].data.option.length;j++){
                                  tems.push(tempdata[i].data.option[j].text)
                     		}
                     			tempdata[i].data["checked"]=tems
                     		
                     		
                     		//tempdata[i].data["checked"]=tempdata[i].data.option
                               
                     	}
                     	     
                     }
                     this.datasources=tempdata;
                      console.log("tempdata:", tempdata)
                    }
            	},
            	OkBtn(){
                     this.endTime= Date.parse(new Date())/1000;
                    let data=this.datasources;
                    console.log("datasources:",data)
                     for(let i=0;i<data.length;i++){
                     	if(data[i].data.checked.length==0&&data[i].data.type==0){
                           this.$message({
			                showClose: true,
			                message:"问卷单选框不能为空",
			                type: 'warning'
			              });
                           return false
                     	}
                     	if(data[i].data.checked.length==0&&data[i].data.type==1){
                           this.$message({
			                showClose: true,
			                message:"问卷多选框不能为空",
			                type: 'warning'
			              });
                           return false
                     	}
                     	if(data[i].data.checked.length==0&&data[i].data.type==2){
                           this.$message({
			                showClose: true,
			                message:"问卷输入框不能为空",
			                type: 'warning'
			              });
                           return false
                     	}
                     	if(data[i].data.checked.length==0&&data[i].data.type==3){
                           this.$message({
			                showClose: true,
			                message:"问卷文本框不能为空",
			                type: 'warning'
			              });
                           return false
                     	}
                     }
              //       let tp4=0;
              //       let otp=0;
              //        for(let i=0;i<data.length;i++){
              //        	if(data[i].data.type==4){
              //        		tp4++;
              //        	}
              //        	else{
              //        		if(data[i].data.checked.length==0){
              //        			otp++;
              //        		}
                     		
              //        	}
              //        }

              //        if(tp4+otp==data.length){
                     	 
			           //    this.$message({
			           //      showClose: true,
			           //      message:"问卷不能为空",
			           //      type: 'warning'
			           //    });
			           // return false;
              //        }
            

                      this.disabled=true;
                     for(let i=0;i<data.length;i++){
                     	if(data[i].data.checked.length==0){
                          console.log("checkedL:",i)
                          data[i].data.checked[0]="";
                     	}
                     }
                      let datas={
                      	"naireId":this.id,
                      	"sys":this.sys,
                      	"naireName":this.datasource.naireName,
                      	"startTime":this.startTime,
                      	"endTime":this.endTime,
                      	"answers":this.datasources
                      }
            	  dataget("post", datas," ","/qnaire/front/storeans",this.getOkSuccess);
                     

                    
                  
            	},
            	getOkSuccess(res){
            		
                       if(res.flag==1){
			              this.$message({
			                showClose: true,
			                message: res.msg,
			                type: 'success',

			              });
			               //window.location.reload();
			            }
			            else{
			            	this.disabled=false;
			            	 //window.location.reload();

			            }

			            
            	}

        },
        mounted(){
        	 this.startTime= Date.parse(new Date())/1000
	         this.id=this.$route.query.id;
	         this.getAjax();
	        var browser={
					  versions:function(){
					    var u = navigator.userAgent, 
					      app = navigator.appVersion;
					    return {
					      trident: u.indexOf('Trident') > -1, //IE内核
					      presto: u.indexOf('Presto') > -1, //opera内核
					      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
					      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
					      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
					      iPad: u.indexOf('iPad') > -1, //是否iPad
					      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
					      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
					      qq: u.match(/\sQQ/i) == " qq" //是否QQ
					    };
					  }(),
					  language:(navigator.browserLanguage || navigator.language).toLowerCase()
					}
					if(browser.versions.android){
						this.sys=0;
					}
					else if(browser.versions.ios){
					   this.sys=1;
					}
					else if(!browser.versions.android&&!browser.versions.ios){
						 this.sys=2;
					}

					
        },
          components: {
		     
		      draggable,
		 
		  },
		   created(){
               document.title="首页"
              },
      
        
      }
</script>
<style lang="sass" scoped>
.content{
	width:100%;
	margin:auto;
	max-width:640px;
	.banner{
		display:block;
		width:100%;
		float:left;
	}
}
.list-complete-item{
	text-align:left;
	height:1.6rem;
	line-height:1.6rem;
	cursor:move;
}
.bigclass{
	width:100%;
	height:100vh;
	overflow-y:auto;
}
	.formdiv{
    width: 100%;
    float: left;
    height: auto;
    background: url("") no-repeat ;
    background-size:100% auto;
    background-position-y:bottom;;
}
.dycontent{
    min-height: 600px;
    height: auto;
    width: 94%;
    margin-left: 3%;
    float: left;
}
.biaoti{
    text-align: center;

}
.jianjie{
    color: rgb(52,52,52);
    font-size: 0.8rem
}
.item{
    float: left;
    width: 100%;
    margin-top: 1rem;
}
.title{
     color: rgb(51,51,51);
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
}
.label{width: 100%;float: left;height: 1.5rem;text-align:left}
.input input{
    width: 80%;
    border: 1px solid #ccc;
    float: left;
    height: 1.5rem;
    border-radius: 5px;
}
.texta{
    width: 80%;
    float: left;
    height: 4rem;
    border: 1px solid #ccc;

}
.rank label{
    cursor: move;
}
.tjbtn{
   
    float: left;
    width:32% ;
   
    height: 2.2rem;
    margin-bottom: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    color: white;
    font-size: 1.1rem;
    margin-left: 34%;
    cursor: pointer;
}
.ok{
   
    float: left;
    width:36% ;
    background-size: 100% 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    font-size: 1.1rem;
    margin-left: 32%;
    cursor: pointer;
}
.modal-wripper{
    width: 100%;
    position: absolute;
    background: #000000;
    opacity: 0.5;
    top: 0;
    display: none;
}
.model{

    float: left;
    margin-left: 3%;
    position: fixed;
    border-radius: 5px;


}
.model .opc{
    width: 100%;
    border-radius: 5px;

}
.model-content{
    width: 90%;
    float: left;
    margin-left: 5%;
    font-size: 1.2rem;
    position: absolute;top: 0px;
    color: #000000;
    font-weight: bold;
    text-align: center;
}
h3{
    margin-top: 10%;
}
@media screen and (min-width: 1000px) {
    .model{
        width: 530px;
    }
}
@media screen and (max-width: 999px) {
    .model{
        width: 94%;
    }
}
</style>