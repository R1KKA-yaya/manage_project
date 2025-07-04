<script setup>
import { useSettingStore } from '@/stores/setting'
import { useRouter } from 'vue-router'
const router = useRouter()
const SettingStore = useSettingStore()

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
<template>
  <el-header>
  <div class="left">
  <el-icon @click="SettingStore.isCollapsed=!SettingStore.isCollapsed"><Menu /></el-icon>
  <span style="margin-left: 10px;">企业门户管理系统</span>
  </div>
  <div class="right">
    <span>欢迎 admin 回来</span>
    <el-dropdown>
      <span class="el-dropdown-link">
      <el-icon size="30" color="white"><User /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="router.push('/center')">个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  </el-header>
</template>
<style lang="scss" scoped>
.el-header{
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,.right{
  display: flex;
}
.left{
  i{
    margin:auto;
    cursor: pointer;
  }
}
.right{
  .el-dropdown{
    margin:auto;
  }
}
</style>