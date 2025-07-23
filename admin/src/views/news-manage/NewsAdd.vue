<script setup>
import { reactive, ref } from 'vue';
import Editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import { ElMessage } from 'element-plus';
import router from '@/router';

const newsFormRef = ref()
const newsForm = reactive({
  title:'',
  content:'',
  class:0,
  cover:'',
  file:null
})
const newsFormRules = reactive({
  title: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  class: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
})
const options = [
  { label:'最新动态', value:0},
  { label:'典型案例', value:1},
  { label:'通知公告', value:2},
]

const handleEditorChange = (newVal) => {
  newsForm.content = newVal
}

// 每次选择完图片之后的回调
const handleUploadChange = (file) => {
  newsForm.cover = URL.createObjectURL(file.raw)
  newsForm.file = file.raw
}

// 提交表单
const submitForm = () => {
   // 校验表单
    newsFormRef.value.validate(async(valid)=>{
      if(valid){
        // 提交数据到后端
        console.log(newsForm)
        router.push('/news-manage/newslist')
        ElMessage.success('添加用户成功')
      }
    })
}
</script>
<template>
  <el-page-header icon="" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 创建新闻 </span>
      </template>
  </el-page-header>
  
  <el-form
    ref="newsFormRef"
    :model="newsForm"
    :rules="newsFormRules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="newsForm.title" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <Editor @contentChange="handleEditorChange"></Editor>
    </el-form-item>
    <el-form-item label="类别" prop="class">
      <el-select v-model="newsForm.class" placeholder="请选择类别">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="头像" prop="cover">
      <Upload :avatar="newsForm.cover" @changeAvatar="handleUploadChange"></Upload>
    </el-form-item>
    <el-form-item  label=" ">
      <el-button type="primary" @click="submitForm">
        添加
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>