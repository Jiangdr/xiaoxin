<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        <div v-html="content"></div>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function(){
            return {
                content: '<p>Hello BBK</p>',
                editorOption: {
                    // something config
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
                   this.invt = setInterval(() => {
                      this.B();//定时器只能使用这个方法 不然页面跳转之后循环会继续
                      //此时的this指向是该vue组件，不管在哪个地方使用，指向都是该vue组件。
                    }, 1000)
            },
            B: function() {
                    let date=new Date();
                    let year=date.getYear;
                    let month= date.getMonth() + 1;
                    let day= date.getDate();
                    let hours= date.getHours();
                    let min =date.getMinutes();
                     let sec= date.getSeconds();
                    console.log("data",date)
             },

        },
      destroyed () {
          clearInterval(this.invt)
        }
        ,
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>