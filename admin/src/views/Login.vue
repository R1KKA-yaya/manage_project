<script setup>
  const handleLogin = () => {
    localStorage.setItem('token','kerwin')
  }
</script>
<template>
  login
  <button @click="handleLogin">登录</button>
</template>
<style lang="scss" scoped>

</style>