<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')"  icon="el-icon-search">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:red;">{{errmsg}}</p>
               
            </el-form>
        </div>
        
    </div>
</template>

<script>
 import {getajax} from '../../ajax'
  const dataget=getajax.ajaxFun
    export default {
        data: function(){
            return {
               errmsg:'',
               echartType:0,
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
         mounted(){
     
         
        },
          created(){
               document.title="简乐互动问卷调查系统--登录"
              },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("表单数据",self.ruleForm.name)
                         /*self.ruleForm.name="hao707789";
                         self.ruleForm.password="loveXIAO707789";*/
                        //localStorage.setItem('ms_username','');       
                        let data={
                            "name":self.ruleForm.name,
                            "password":self.ruleForm.password,  
                        }
                          dataget("post",data," ","/qnaire/session/login",this.loginSuccess);  
                    }
                     else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            loginSuccess(res){
                 console.log("成功")
                if(res.flag==1){
                 console.log("成功")
                 this.errmsg="登录成功";
                  this.$router.push('/index');
                }
                else{
                    console.log("res",res.msg)
                    this.errmsg=res.msg
                }
                
                 
            },
           
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>