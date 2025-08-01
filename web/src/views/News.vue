<script setup>
import { Search } from '@element-plus/icons-vue'
import coverImg from '@/assets/val3.jpg'
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import { useRouter } from 'vue-router';
import _ from 'lodash'
const isVisible = ref(false)
const searchText = ref('')
const newList = ref([])
const router = useRouter()
onMounted(async()=>{
  const res = await axios.get('/webapi/news/list')
  newList.value = res.data.data
})
const searchNewsList = computed(()=>{
  if(searchText.value){
    return newList.value.filter(item=>item.title.includes(searchText.value))
  }else{
    return []
  }
})

const topNewsList = computed(()=>{
  return newList.value.slice(0,4)
})

const activeName = ref(1)
const tabList = [
  {
    label:'最新动态',
    name:0
  },
  {
    label:'典型案例',
    name:1
  },
  {
    label:'通知公告',
    name:2
  }
]
const tabNews = computed(()=>{
  return _.groupBy(newList.value,(item)=>item.category)
})

const handleNewclick = (id)=>{
  router.push({
    path:'/new/'+id
  })
}
</script>
<template>
  <div class="container">
    <div class="newsHeader" :style="{ backgroundImage: `url('${coverImg}')` }">
      新闻资讯
    </div>
    <div class="search">
      <el-popover
        placement="bottom"
        title="搜索结果"
        width="50%"
        :visible="isVisible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            @input="isVisible=true"
            @blur="isVisible=false"
            type="search"
            size="large"
          />
        </template>
        <div v-if="searchNewsList.length">
          <div v-for="item in searchNewsList" :key="item._id" class="search-item" @click="handleNewclick(item._id)">
            {{ item.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无新闻" :image-size="50"/>
        </div>
      </el-popover>
    </div>
    <div class="topnews">
       <el-row :gutter="30">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card shadow="hover" @click="handleNewclick(item._id)">
            <div class="image" :style="{backgroundImage:`url('http://localhost:3000/${item.cover}')`}"></div>
            <div>
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" class="news-tabs">
      <el-tab-pane v-for="item in tabList" :label="item.label" :name="item.name" :key="item.name">
        <el-row :gutter="20">
          <el-col :span="18">
            <div v-for="data in tabNews[item.name]" :key="data._id" style="padding: 10px;">
              <el-card shadow="hover" @click="handleNewclick(data._id)">
                <div class="content">
                  <div class="image" :style="{backgroundImage:`url('http://localhost:3000/${data.cover}')`}"></div>
                  <div class="text">
                    <span>{{ data.title }}</span>
                    <div class="bottom">
                      <time class="time">{{ formatTime.getTime(data.editTime) }}</time>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
             <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="data in tabNews[item.name]"
                :key="data._id"
                :timestamp="formatTime.getTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>
<style lang="scss" scoped>
.container{
  position: relative;
  .search{
    position: absolute;
    width: 100%;
    top:400px;
    text-align: center;
    .el-input{
      width: 50%;
    }
  }
}
.newsHeader{
  width: 100%;
  height: 500px;
  background-size: cover;
  text-align: center;
  color: white;
  line-height: 500px;
  font-size: 60px;
}
.search-item{
  height: 50px;
  line-height: 50px;
  &:hover{
    background-color: whitesmoke;
    color: red;
  }
}

.topnews{
  margin:30px;
  .image{
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
  }
  .time{
    font-size: 13px;
    color: gray;
  }
}

.news-tabs{
  margin-left: 40px;
  .content{
    display: flex;
    .image{
      width: 300px;
      height: 150px;
      background-size: cover;
      background-position: center;
      margin-right: 30px;
    }
    .text{
      margin-top: 10px;
      .time{
        font-size: 13px;
        color: gray;
      }
    }
    
  }
}
</style>