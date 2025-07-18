<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const tableData = ref([])
const getTableData = async () => {
  const res = await axios.get('/adminapi/user/list')
  tableData.value = res.data.data
}
onMounted(()=>{
  getTableData()
})
const handleEdit = (data) => {
  console.log(data)
}
const handleDelete = (data) => {
  console.log(data)
}
</script>
<template>
  <el-page-header icon="" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 用户列表 </span>
      </template>
  </el-page-header>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column label="头像" width="180">
      <template #default="scope">
        <el-avatar :size="50" :src="scope.row.avatar?'http://localhost:3000/'+scope.row.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      </template>
    </el-table-column>
    <el-table-column label="角色" width="180">
      <template #default="scope">
        <el-tag type="danger" v-if="scope.row.role===1">管理员</el-tag>
        <el-tag type="success" v-else>编辑</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>

</style>