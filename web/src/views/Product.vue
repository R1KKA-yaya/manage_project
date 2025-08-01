<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'

const loopList = ref([])
onMounted(async()=>{
  const res = await axios.get('/webapi/product/list')
  loopList.value = res.data.data
  console.log(loopList.value)
  
})
</script>
<template>
  <el-carousel
    height="calc(100vh - 60px)"
    direction="vertical"
    motion-blur
    :autoplay="true"
  >
    <el-carousel-item v-for="item in loopList" :key="item._id">
      <div class="item" :style="{ backgroundImage: `url(http://localhost:3000/${item.cover})` }">
        <el-card>
          <template #header>
            <div class="title">
              <h2>{{ item.title }}</h2>
            </div>
          </template>
          <div>
            {{ item.introduction }}
          </div>
          <div class="detail">
            {{ item.detail }}
          </div>
          <div class="more">
            更多信息请访问https://val.qq.com
          </div>
        </el-card>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<style lang="scss" scoped>
.demonstration {
  color: var(--el-text-color-secondary);
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

.item{
  width: 100%;
  height: 100%;
  background-size: cover;
  .el-card{
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    .detail,.more{
      margin-top: 20px;
    }
  }
}
</style>
