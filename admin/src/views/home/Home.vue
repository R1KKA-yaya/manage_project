<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue';
const UserStore =useUserStore()   
const avatarUrl = computed(()=>UserStore.userInfo.avatar?UserStore.userInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const welcomeText = computed(()=>new Date().getHours()<=12?'要开心每一天.':'喝杯咖啡提提神吧.')
</script>
<template>
  <div>
    <el-page-header icon="" title="企业门户管理网站">
      <template #content>
        <span class="text-large font-600 mr-3"> 首页 </span>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px;">欢迎 {{ UserStore.userInfo.username }} 回来, {{ welcomeText }}</h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      1111
    </el-card>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  {{ UserStore.userInfo }}
</template>
<style lang="scss" scoped>
  .box-card{
    margin-top: 50px;
  }
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>