<template>
    <div class="controlItem " >
        <div class="editControl" :class="{'hide':show}">
            <div class="editControl-div">
               <el-input placeholder="请输入题目" v-model="title" >
                <template slot="prepend" >多行文本题目</template>
               </el-input>
            </div>
            <div class="editControl-div">
               <el-input placeholder="请输入备注"  v-model="beizhu">
                <template slot="prepend">多行文本备注</template>
               </el-input>
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
             <el-input placeholder="请输入内容" >       
             </el-input>
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
                 show:false,
            }
        },
         props:["parentToChild","editData"],
        methods:{
            toEdit(){
                 this.show=false
                //编辑当前内容
            },
            creatIt(){
                 if(this.title==''){
                     this.$message({
                      showClose: true,
                      message: '多文本题目不能为空',
                      type: 'error'
                    });
                      return false;
                 
                }
                else{
                    this.show=true;
                     return  this.getData()
                }
            },
              getData(){
                 let itemData={"title":this.title,
                         "mark":this.beizhu,
                         "type":3,//类型 0单选 1多选 2单行 3多行 4排序
                         "option":''
                     }
                     let data={"id":parseInt(this.parentToChild),"show":this.show,"data":itemData}
                     this.$emit("childToParentData", data);
                    // console.log("子组件内容",data[2].title)
                     return data
            },
            delFunc(index){
                  this.$emit("childToParentId", index);
            },//删除当前组件
        },
        mounted(){
            if(this.editData!=undefined){
               this.title=this.editData.title;
               if( this.editData.mark!=undefined){
                 this.beizhu=this.editData.mark;
               }
              
               }
        },
      
        
      }
</script>
<style lang="sass" scoped="">
    
</style>