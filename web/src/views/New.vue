<script setup>
import formatTime from '@/util/formatTime';
import axios from 'axios';
import { ref, watchEffect } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { StarFilled } from '@element-plus/icons-vue';
const route = useRoute();
const router = useRouter();
const currentNews = ref({})
const topNewsList = ref([])
watchEffect(async()=>{  
  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
  const res2 = await axios.get('/webapi/news/toplist',{
    params:{
      limit:4
    }
  })
  currentNews.value = res1.data.data[0]
  topNewsList.value = res2.data.data
})
const handleNewclick = (id) => {
  router.push({
    path:'/new/'+id
  })
}
</script>
<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ currentNews.title }}</h2>
        <div class="bottom">
          <time class="time">{{ formatTime.getTime(currentNews.editTime) }}</time>
        </div>
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="currentNews.content" class="content"></div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card style="max-width: 480px">
        <template #header>
            <div class="card-header">
            <span>最近新闻</span>
          </div>
        </template>
        <div 
        v-for="item in topNewsList" 
        :key="item._id" 
        class="text item" 
        style="padding:14px"
        @click="handleNewclick(item._id)"
        >
          <span>{{ item.title }}</span>
          <div class="bottom">
            <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style scoped lang="scss">
.el-row{
  margin-top: 30px;
}

.content {
  width: 100%;
}

.time{
  font-size: 13px;
  color: #999;
}

:deep(.content) img {
  width: 100% !important;
}
</style>