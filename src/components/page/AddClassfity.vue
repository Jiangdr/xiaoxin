<template>
 <el-dialog
  title="提示"
  :visible.sync="visibles"
  width="30%"
  :before-close="handeCancel">
  <div >
   <el-form :inline="true" :model="formInline" :rules="rules"  class="demo-form-inline" ref="formInline">
      <el-form-item label="分类" prop="classfity">
        <el-input v-model="formInline.classfity" placeholder=""></el-input>
      </el-form-item>
       <el-form-item label="分类地址" prop="cl">
        <el-input v-model="formInline.cl" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
      </el-form-item>
      <el-form-item> 
      </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handeCancel">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import {validatorVue} from '../../js/validatorVue'
  export default {
    data() {
       return {
        dialogVisible: true,
         formInline: {
          classfity: '',
          cl:''
        },
        rules: {
          classfity: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { validator: validatorVue.getVali, trigger: 'blur',rule:'url' }
          ],
          cl:[
             { required: true, message: '请输入分类名称', trigger: 'blur' },
             { validator: validatorVue.getVali, trigger: 'blur',rule:'number' }
          ],
        }
      };
    },
     props:["visibles"],
    methods: {
      handleClose(done) {
        this.$confirm('确认提交？')
          .then(_ => {
            this.handeCancel()
          })
          .catch(_ => {});
      },
      handeCancel(){
      	this.$emit('callbackParent', this.dialogVisible);
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.formInline.classfity,this.formInline)
            alert('submit!:'+JSON.stringify(this.formInline));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    }
  };
</script>