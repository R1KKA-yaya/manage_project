<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue'; 
// 表单
const userFormRef = ref()

const router = useRouter()
const userForm = reactive({
  username:'',
  password:'',
  role:2,
  introduction:'',
  avatar:'',
  file:null,
  gender:0 //保密
})

const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择角色', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
})
// 角色选择
const options = [
  {label:'管理员',value:1},
  {label:'编辑',value:2},
]

// 每次选择完图片之后的回调
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file.raw)
  userForm.file = file.raw
}

// 提交表单
const submitForm = () => {
   // 校验表单
    userFormRef.value.validate(async(valid)=>{
      if(valid){
        // 提交数据到后端
        await upload('/adminapi/user/add',userForm)
        router.push('/user-manage/userlist')
        ElMessage.success('添加用户成功')
      }
    })
}
</script>
<template>
  <el-page-header icon="" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用户 </span>
      </template>
  </el-page-header>

  <el-form
    ref="userFormRef"
    :model="userForm"
    :rules="userFormRules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" />
    </el-form-item>
      <el-form-item label="角色" prop="role">
      <el-select v-model="userForm.role" placeholder="请选择角色">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="个人简介" prop="introduction">
      <el-input v-model="userForm.introduction" type="textarea"/>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <Upload :avatar="userForm.avatar" @changeAvatar="handleChange"></Upload>
    </el-form-item>
    <el-form-item  label=" ">
      <el-button type="primary" @click="submitForm">
        更新
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>