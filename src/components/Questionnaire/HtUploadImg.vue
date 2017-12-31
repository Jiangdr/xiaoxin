<template>
	<div class="controlItem " style="margin-top:0" >
		<div class="editControl" >
			<el-upload
       drag
      class="avatar-uploader"
      :action="urll+'/qnaire/upload/uploadPic'"
      :show-file-list="false"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
      <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:100px;">{{parentToChildTitle}}</i>
    </el-upload>
    <div class="deldiv" v-if="imageUrl!=''">
         <el-tooltip class="item" effect="dark" content="移除图片" placement="right">
            <p class="todelItem" @click="delFunc"><i class="el-icon-delete"></i></p>
          </el-tooltip>
    </div>
		</div>
		
	</div>
</template>
<script >
  import { getajax } from '../../ajax';
 const dataurl=getajax.serviurl
    export default {
        name: '',
        data () {
            return {  
            	imageUrl: '',
              urll:'',
            }
        },
        props:["parentToChildTitle","imgurl"],
        methods:{
        	 handleAvatarSuccess(res, file) {
            console.log("ceshi",res,file)
            if(res.flag==1){
               this.imageUrl =res.msg;
                this.$emit("childToParentData", this.imageUrl);
            }
            else{
               this.$message.error(res.msg);
            }

            },
            delFunc(){
                 this.imageUrl='';
                 this.$emit("childToParentData", this.imageUrl);
            },//删除图片
            handleRemove(file, fileList){},
            beforeAvatarUpload(file) {
              console.log(file.type)
              const isJPG = file.type === 'image/jpeg';
              const isPNG =file.type ==='image/png';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isJPG&&!isPNG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                return false;
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return file.type && isLt2M;
              //return file.type
            }
        },
        mounted(){
        this.urll=dataurl()
          if(this.imgurl!=undefined){
            this.imageUrl=this.imgurl;
          }
           this.$emit("childToParentData", this.imageUrl);
         
            
        },
      
        
      }
</script>
<style lang="sass" scoped="">

</style>