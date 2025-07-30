<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue'; 
import axios from 'axios';
// 表单
const productFormRef = ref()

const router = useRouter()
const route = useRoute()
const productForm = reactive({
  title:'',
  introduction:'',
  detail:'',
  cover:'',
  file:null,
})

const productFormRules = reactive({
  title: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入产品简要概述', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请输入产品详细概述', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传产品图片', trigger: 'blur' },
  ],
})

// 每次选择完图片之后的回调
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file.raw)
  productForm.file = file.raw
}

// 提交表单
const submitForm = () => {
   // 校验表单
    productFormRef.value.validate(async(valid)=>{
      if(valid){
        // 提交数据到后端
        await upload('/adminapi/product/list',productForm)
        router.push('/product-manage/productlist')
        ElMessage.success('编辑产品成功')
      }
    })
}

const getFormData = async() => {
  const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
  Object.assign(productForm,res.data.data[0])
}
onMounted(()=>{
  getFormData()  
})
</script>
<template>
  <el-page-header @back="router.back()" title="产品管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加产品 </span>
      </template>
  </el-page-header>

  <el-form
    ref="productFormRef"
    :model="productForm"
    :rules="productFormRules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="产品名称" prop="title">
      <el-input v-model="productForm.title" />
    </el-form-item>
    <el-form-item label="产品简要概述" prop="introduction">
      <el-input v-model="productForm.introduction" />
    </el-form-item>
    <el-form-item label="产品详细概述" prop="detail">
      <el-input v-model="productForm.detail" type="textarea"/>
    </el-form-item>
    <el-form-item label="产品图片" prop="cover">
      <Upload :avatar="productForm.cover" @changeAvatar="handleChange"></Upload>
    </el-form-item>
    <el-form-item  label=" ">
      <el-button type="primary" @click="submitForm">
        编辑产品
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>