<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const tableData = ref([])
const getTableData = async () => {
  const res = await axios.get('/adminapi/user/list')
  tableData.value = res.data.data
}
onMounted(()=>{
  getTableData()
})

const handleEdit = async (data) => {
  dialogFormVisible.value = true
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  Object.assign(userForm, res.data.data[0]);
  console.log(res)
}
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/list/${data._id}`)
  getTableData()
}

const dialogFormVisible = ref(false)
const userFormRef = ref()
const formLabelWidth = '140px'

const userForm = reactive({
  username: 'sb',
  password: '',
  role: 2,
  introduction: '',
})

const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
})

const handleEditConfirm = () => {
  userFormRef.value.validate(async(valid)=>{
      if(valid){
        // 提交数据到后端
        await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)
        ElMessage.success('编辑用户成功')
        getTableData()
        dialogFormVisible.value = false
      }
    })
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
  <el-dialog v-model="dialogFormVisible" title="编辑用户" width="30%">
    <el-form 
    :model="userForm"
    ref="userFormRef"
    :rules="userFormRules">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="userForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="userForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option label="管理员" :value="1" />
          <el-option label="编辑" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" :label-width="formLabelWidth" prop="introduction">
       <el-input
        v-model="userForm.introduction"
        :rows="2"
        type="textarea"
      />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.el-table{
  margin-top: 50px;
}
</style>