<template>
  <div class="container">
    <el-carousel style="height: calc(100vh - 60px);" motion-blur>
      <el-carousel-item v-for="item in 3" :key="item">
        <div :style="getImageStyle(item)"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">互联网+时代</div>
  </div>
</template>
<script setup>
const getImageStyle = (index) => {
  const imageUrl = new URL(`../assets/val${index}.jpg`, import.meta.url).href;
  return {
    backgroundImage: `url(${imageUrl})`
  };
};
</script>
<style lang="scss" scoped>
.el-carousel {
  height: 100%;
  :deep(.el-carousel__container) {
    height: 100%;
    div {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.container{
  position: relative;
  .center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    text-align: center;
    color: white;
  }
}
</style>