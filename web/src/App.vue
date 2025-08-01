<script setup>
import Navbar from '@/components/Navbar.vue' 
</script>
<template>
  <Navbar></Navbar>
  <router-view></router-view>
</template>
<style lang="scss">
*{ 
  margin: 0;
  padding: 0;
}
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 5px; /* 垂直滚动条宽度 */
  height: 5px; /* 水平滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* 滚动条滑块悬停状态 */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
