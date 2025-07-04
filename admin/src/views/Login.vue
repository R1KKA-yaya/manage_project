<script setup>
  import {reactive,ref} from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
  }
  const options = {
                    background: {
                        color: {
                            value: '#ffffff'
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: 'random'
                        },
                        links: {
                            color: 'random',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: false,
                            speed: 6,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 5 }
                        }
                    },
                    detectRetina: true
                }
  
  // 表单的引用对象
  const loginFormRef = ref()
  // 表单的响应式对象 
  const loginForm = reactive({
    username:'',
    password:''
  })
  // 表单的验证规则
  const loginRules = reactive({
    username:[
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 5, max: 13, message: '长度应为5到13', trigger: 'blur' },
    ],
    password:[
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 13, message: '长度应为5到13', trigger: 'blur' },
    ]
  })       
  // 提交表单
  const submitForm = () => {
    // 校验表单
    loginFormRef.value.validate((valid)=>{
      if(valid){
        console.log(loginForm)
        localStorage.setItem('token','kerwin')
        router.push('/index')
      }
    })

  }
</script>
<template>
  <div>
    <vue-particles
              id="tsparticles"
              :particlesLoaded="particlesLoaded"
              :options="options"
    />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
      ref="loginFormRef"
      style="max-width: 600px"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
  color: white;
  h3 {
    font-size: 30px;
  }
}
:deep(.el-form-item__label) {
  color: white;
}

</style>