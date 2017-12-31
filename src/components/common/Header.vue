<template>
    <div class="header">
        <div class="logo">问卷调研平台</div>
       <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <router-link to="/create"><el-menu-item index="1">创建问卷</el-menu-item></router-link>
          <router-link to="/index"><el-menu-item index="2">我的问卷</el-menu-item></router-link>
        </el-menu>
        <div class="header-right"><span>用户名:{{name}}</span>&nbsp;&nbsp;&nbsp;<span class="exit" @click="handleCommand('loginout')">退出</span></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'hutao',
                activeIndex:'2',
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                   // localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            handleSelect(key, keyPath) {
                    console.log(key, keyPath);
                  }
        }
    }
</script>
<style lang="sass" scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
         background-color:white;
        border-bottom: 1px solid #ccc
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .el-menu-item{
        font-size: 16px;
        font-weight: bold;
    }
    .el-menu{
      width: auto;
      float: left;
      height: 68px;
      line-height: 68px;
      background-color: white;
    }
    .header .is-active{
        color: rgb(89,174,254);
        border-bottom: 5px solid rgb(89,174,254);
    }
    .header-right{
        width: 160px;
        float: right;
        margin-right: 30px;
       
        height: 70px;
        line-height: 70px;
        font-size: 14px;
         .exit{
               color:red; 
               cursor:pointer
            }
    }

</style>
