<template>
	<div class="div404">
		<img class="img404"  src="../../../static/img/404.png">
		<h1>你要查看的页面不见了,<router-link to="/Login" style="color:#66b1ff">点我</router-link>返回首页</h1>
    </div>
</template>
<script>
export default {
  name: 'Notfund',
  data () {  
      return {} 
  },
}
</script>
<style type="text/css">
    .div404{
      width: 600px;
      height: 500px;
      position: absolute;
      margin-left: -300px;
      margin-top: -250px;
      left: 50%;
      top: 50%;
    }
	.img404{
		width: 600px;
	}
</style>