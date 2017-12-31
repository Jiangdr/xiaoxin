<template>
    <div class="wrapper">
        <v-head></v-head>
       <!--  <v-sidebar></v-sidebar> -->
        <div class="content" style="float:left;width:100%;overflow-y:hidden">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
      
    </div>

</template>
<script>
    import vHead from './Header.vue';
/*    import vSidebar from './Sidebar.vue';*/
    export default {
        components:{
            vHead
        }
    }
</script>
