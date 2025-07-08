<script setup>
import axios from 'axios'
axios.get('/adminapi/user/home').then(res=>{
  console.log(res.data)
})
</script>
<template>
  home
</template>
<style lang="scss" scoped>

</style>