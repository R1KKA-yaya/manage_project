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
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/list/${data._id}`)
  getTableData()
}
</script>
<template>
  <el-page-header icon="" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 用户列表 </span>
      </template>
  </el-page-header>
  <el-table :data="tableData" style="width: 100%">
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
        <el-popconfirm title="你确定要删除吗？"
        confirmButtonText="确定"
        cancelButtonText="取消"
        @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button
              size="small"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
.el-table{
  margin-top: 50px;
}
</style>