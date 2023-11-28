<template>
    <div class="navbar">

     <el-menu
            :default-active="router.fullPath"
            class="el-menu-demo"
            mode="horizontal"
            :router = "true"
              >
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/news">News Center</el-menu-item>
        <el-menu-item index="/product">Product Center</el-menu-item>

        <el-menu-item index="" @click="handleClick">Login</el-menu-item>

     </el-menu>
         <div class="right">
            Home
         </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
    // ¥ý¥Îwindow¸õÂà 
    const handleClick = ()=>{
        window.location = "http://localhost:8080"
    }
</script>

<style scoped lang="scss">
    .navbar{
        position: sticky;
        top: 0px;
        z-index:1000;
    }
    .right{
    position: fixed;
    top:0;
    right:20px;
    windows:100px;
    height:59px;
    Line-height: 59px;
    text-align: center;
    }
    
</style>