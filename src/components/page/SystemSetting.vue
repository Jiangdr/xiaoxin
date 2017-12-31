<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统</el-breadcrumb-item>
                <el-breadcrumb-item>系统参数设置{{ruleForm.url}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width:100%">
            <el-form  label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-row>
              
                <el-form-item label="文章标题" prop="title">
                  <el-col :span="12">
                    <el-input v-model="ruleForm.title">dsds</el-input>
                  </el-col>
                </el-form-item>
                 <el-form-item label="文章来源就是他" prop="url">
                 	<el-col :span="12">
                    <el-input v-model="ruleForm.url"></el-input>
                   </el-col>
                </el-form-item>
                <el-form-item label="作者" prop="name">
                	<el-col :span="12">
                    <el-input v-model="ruleForm.name"></el-input>
                   </el-col>
                </el-form-item>
                <el-form-item label="所属分类" prop="classfity">
                	<el-col :span="12">
                      <el-input v-model="ruleForm.classfity"></el-input>
                    </el-col>
                </el-form-item>
                 <el-form-item label="跳转地址" prop="urls">
                 	<el-col :span="12">
                    <el-input v-model="ruleForm.urls"></el-input>
                  </el-col>
                </el-form-item>
                 <el-form-item label="图片上传" prop="img">
                 	<el-col :span="12">
                    <el-upload
          					  class="avatar-uploader"
          					  action="https://jsonplaceholder.typicode.com/posts/"
          					  :show-file-list="false"
          					  :on-success="handleAvatarSuccess"
          					  :before-upload="beforeAvatarUpload">
          					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
          					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          					</el-upload>
  				    </el-col>
                  </el-form-item>
                   <el-form-item label="内容" prop="content">
                     <el-col :span="20">
                      <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
                     </el-col>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button>取消</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
        </div>        
    </div>
</template>

<script>
import {quillEditor } from 'vue-quill-editor';
import {getajax} from '../../js/ajax'
    export default {
        data: function(){
        	var validatePass = (rule, value, callback) => {
            console.log("rule",rule)
		        if (value === '55') {
		          callback(new Error('请输入网站名称'));
		        } else {
		          callback();
		        }
		      };
		      var validateUrl =(rule, value, callback)=>{  
            getajax.ajaxFun();
		      console.log(value)                                             
		      	if(value===''){
						callback(new Error('请输入网站地址'));
		      	}
		      	else if(!value.match(/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/)){
                        callback(new Error('请输入正确网站地址'));
		      	}
		      	else{
		      		callback();
		      	}
		      }
            return {
             
              datasoucre:'',
                ruleForm: {
                  title:'',
                    name:'',
                    url:'',
                    email:'',
                    classfity:'',
                    urls:'',
                    img:'',
                    imageUrl:'',
                },
                
                 rules: {
      			          name: [
      			            { required: true, message: '请输入活动名称', trigger: 'blur' },
      			            { validator: validatePass, trigger: 'blur' }
      			          ],
      			           url: [
      			            { validator: validateUrl, trigger: 'blur' }
      			          ]
			        },
			    content: '<p>Hello BBK</p>',
                editorOption: {}
            }
        },
        components: {
            quillEditor
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
         mounted(){
         
           if(this.$route.query.sysdata==undefined){

           }else{
            this.datasoucre=JSON.parse(this.$route.query.sysdata);
            this.ruleForm.title=this.datasoucre.id;
            this.imageUrl=this.datasoucre.piclog;
            this.ruleForm.url=this.datasoucre.piclog;
            console.log(this.title) //
           }
          },
        methods: {
         submitForm(formName) {
            this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$message.success('提交成功！');
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
         },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        },
       beforeAvatarUpload(file) {
       	console.log("file",file)
        const isJPG = file.type == 'image/jpeg';
        const isPNG = file.type == 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG&&!isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
       onEditorChange({ editor, html, text }) {
                this.content = html;
            },
     }
    }
</script>
<style type="text/css">
	.el-upload--text{
		width: 100px;
		height: 80px;
	}
	.avatar-uploader-icon{
		margin-top: 35px;
	}
  .avatar{
    width: 100%;
    height: 100%;
  }
</style>