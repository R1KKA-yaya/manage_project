<script setup>
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue';
const UserStore =useUserStore()   
const avatarUrl = computed(()=>UserStore.userInfo.avatar?'http://localhost:3000/'+ UserStore.userInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
// 表单
const userFormRef = ref()
const {username,gender,introduction,avatar} = UserStore.userInfo
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file:null
})
// const userForm = computed(() => UserStore.userInfo)
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
})
// 性别选择
const options = [
  {label:'保密',value:0},
  {label:'男',value:1},
  {label:'女',value:2}
]

// 每次选择完图片之后的回调
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file.raw)
  userForm.file = file.raw
}

// 更新表单
const submitForm = () => {
   // 校验表单
    userFormRef.value.validate(async(valid)=>{
      if(valid){
        const res = await upload('/adminapi/user/upload',userForm)
          if(res.ActionType==="OK"){
            UserStore.updateUserInfo(res.data)
            ElMessage.success('更新成功')
          }
      }
    }
    )
}
</script>
<template>
  <el-page-header icon="" title="企业门户管理网站">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
  </el-page-header>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card class="box-card">
        <el-avatar :size="100" :src="avatarUrl" />
        <h3>{{ UserStore.userInfo.username }}</h3>
        <h5>{{ UserStore.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
        <el-form
          ref="userFormRef"
          style="max-width: 600px"
          :model="userForm"
          :rules="userFormRules"
          label-width="auto"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>
           <el-form-item label="性别" prop="gender">
            <el-select v-model="userForm.gender" placeholder="请选择性别">
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
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.el-row{
  margin-top: 20px;
  .box-card{
    text-align: center;
  }
}
</style>