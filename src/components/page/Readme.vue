<template>
  <div>
         <p v-for="obj in items"><i :class="obj" >{{obj}}</i></p>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
    export default {
        name: '',
        data () {
            return {
              
            items:["el-icon-zoom-out","el-icon-upload2","el-icon-view","el-icon-time","el-icon-zoom-in","el-icon-sort","el-icon-tickets","el-icon-circle-check-outline","el-icon-star-off","el-icon-remove-outline","el-icon-sold-out","el-icon-service","el-icon-circle-check"]
            }
        },
        methods:{
          getdata (evt) {
             console.log(evt.draggedContext.element.id)
            },
            datadragEnd (evt) {
             console.log('拖动前的索引 :' + evt.oldIndex)
             console.log('拖动后的索引 :' + evt.newIndex)
             console.log(this.tags)
            }
           },
        components: {
      　　draggable
        },
         mounted(){
           //this.$router.push('/index')
         }
           

    }
</script>
<style scoped>
      
</style>