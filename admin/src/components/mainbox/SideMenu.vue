<script setup>
import { useSettingStore } from '@/stores/setting'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
const route = useRoute()
const UserStore = useUserStore()
const SettingStore = useSettingStore()

const vAdmin = {
  mounted (el) {
    if(UserStore.userInfo.role !== 1){
      el.parentNode.removeChild(el)
    }
  }
}
</script>
<template>
  <el-aside :width="SettingStore.isCollapsed?'64px':'200px'">
      <el-menu :collapse="SettingStore.isCollapsed"
      router
      :default-active="route.fullPath"
      >
        <el-menu-item index="/index">
          <el-icon><home-filled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/center">
          <el-icon><avatar /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="/user-manage" v-admin>
            <template #title>
              <el-icon><userFilled /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/news-manage">
            <template #title>
              <el-icon><messageBox /></el-icon>
              <span>新闻管理</span>
            </template>
            <el-menu-item index="/news-manage/addnews">创建新闻</el-menu-item>
            <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/product-manage">
            <template #title>
              <el-icon><reading /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
            <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
  </el-aside>
</template>
<style lang="scss" scoped>
  .el-aside{
    height: 100vh;
    transition: width 0.3s ease;  /* 关键：让宽度变化有动画 */
    .el-menu{
      height: 100%;
    }
  }
</style>