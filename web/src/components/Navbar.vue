<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
const handleClick = () => {
  window.location='http://localhost:5174'
}
</script>
<template>
  <el-menu
    router
    :default-active="route.fullPath"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/news">新闻中心</el-menu-item>
    <el-menu-item index="/product">产品与服务</el-menu-item>
    <el-menu-item index="" @click="handleClick">登录</el-menu-item>
  </el-menu>
  <div class="right">
      企业门户官网
  </div>
</template>
<style lang="scss" scoped>
.el-menu-demo{
  position: sticky;
  top: 0px;
  z-index: 1000;
}
.right{
    position: fixed;
    top: 0;
    right: 20px;
    width: 100px;
    height: 59px;
    line-height: 59px;
    text-align: center;
    z-index: 1001;
  }
</style>