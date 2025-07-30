<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue'
import formatTime from '@/util/formatTime';
import { useRouter } from 'vue-router';

const router = useRouter()
const tableData = ref([])
const getTableData = async () => {
  const res = await axios.get('/adminapi/product/list')
  tableData.value = res.data.data
}

onMounted(()=>{
  getTableData()
})

const handleDelete = async (item) => {
  await axios.delete(`/adminapi/product/list/${item._id}`)
  await getTableData()
}

</script>
<template>
  <el-card>
    <el-page-header icon="" title="产品管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 产品列表 </span>
      </template>
    </el-page-header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180" />    
      <el-table-column prop="introduction" label="简要概述" width="360" />    
      <el-table-column prop="editTime" label="更新时间" width="180">
        <template #default="scope">
          {{ formatTime.getTime(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button 
            :icon="Edit"
            circle
            @click="router.push(`/product-manage/productedit/${scope.row._id}`)" />
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
</template>
<style lang="scss" scoped>
:deep(.htmlcontent){
  img{
    width: 100%;
  }
}
</style>