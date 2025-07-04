<script setup>
import { useSettingStore } from '@/stores/setting'
const SettingStore = useSettingStore()
</script>
<template>
  <el-header>Header
  <button @click="SettingStore.isCollapsed=!SettingStore.isCollapsed">change</button>
  </el-header>
</template>