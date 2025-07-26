<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { View, Edit, Delete } from '@element-plus/icons-vue'
import formatTime from '@/util/formatTime';

const tableData = ref([])
const previewData = ref({})
const dialogFormVisible = ref(false)
const getTableData = async () => {
  const res = await axios.get('/adminapi/news/list')
  tableData.value = res.data.data
}
const categoryFormat = (category) => {
  const arr = ['最新动态','典型案例','通知公告']
  return arr[category]
}
onMounted(()=>{
  getTableData()
})

const handleSwitchChange = async (item) => {
  await axios.put('/adminapi/news/publish',{
    _id:item._id,
    isPublish:item.isPublish
  })
  await getTableData()
}

const handlePreview = (item) => {
  previewData.value = item
  dialogFormVisible.value = true
  console.log(previewData)
}

const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${item._id}`)
  await getTableData()
}

</script>
<template>
  <el-card>
    <el-page-header icon="" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 新闻列表 </span>
      </template>
    </el-page-header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="360" />
      <el-table-column prop="category" label="分类" width="180">
        <template #default="scope">
          {{ categoryFormat(scope.row.category) }}
        </template>
      </el-table-column>             
      <el-table-column prop="editTime" label="更新时间" width="180">
        <template #default="scope">
          {{ formatTime.getTime(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column label="是否发布" width="180">
        <template #default="scope">
          <el-switch v-model="scope.row.isPublish" 
          :active-value="1"
          :inactive-value="0"
          @change="handleSwitchChange(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="success"
            :icon="View"
            circle
            @click="handlePreview(scope.row)" />
          <el-button 
            :icon="Edit" 
            circle />
          <el-popconfirm title="你确定要删除吗？"
            confirmButtonText="确定"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button 
                type="danger" 
                :icon="Delete" 
                circle />
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog v-model="dialogFormVisible" title="预览新闻" width="30%">
    <div>
      <h2>{{ previewData.title }}</h2>
      <div style="font-size: 12px; color: grey;">
      {{ formatTime.getTime(previewData.editTime) }}
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="previewData.content" class="htmlcontent"></div>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>
:deep(.htmlcontent){
  img{
    width: 100%;
  }
}
</style>