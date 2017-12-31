<template>
	<div>
<el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="出发地">
    <el-input v-model="formInline.from_station"></el-input>
  </el-form-item>
  <el-form-item label="目的地">
    <el-input v-model="formInline.to_station"></el-input>
  </el-form-item>
  <el-form-item label="出发日期">
    
      <el-date-picker type="date" placeholder="选择日期" v-model="formInline.train_date" style="width: 100%;"></el-date-picker>
   
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
  </el-form-item>
</el-form>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
     
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
     
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">购买</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {getajax} from '../../js/ajax'
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
      	 formInline: {
          train_date: '',
          from_station: '',
          to_station: '',
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
      methods: {
        submitForm(formName) {
             const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("表单数据",self.formInline)
                       let data=self.formInline;
                       /* localStorage.setItem('ms_username',self.formInline.from_station);       */
                       /* let data={
                            "cmd":"getTicketByHand",
                            "userName":self.formInline.userName,
                            "password":self.formInline.password,
                            "newCode":",",
                        }*/
                        getajax.ajaxFun(data,"",this.loginSuccess)
                    }
                     else {
                        console.log('error submit!!');
                        return false;
                    }
                });
        },
        handleClick(index,res){
        	console.log("row",res)

        }
    }

  }
</script>
