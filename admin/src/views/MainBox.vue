<script setup>
import SideMenu from '@/components/mainbox/SideMenu.vue'
import TopHeader from '@/components/mainbox/TopHeader.vue';
</script>
<template>
  <el-container>
    <SideMenu></SideMenu>
    <el-container direction="vertical">
      <TopHeader></TopHeader>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>

</style>