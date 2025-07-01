import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"; 

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Particles, {
  init: async engine => {
    await loadFull(engine);  // 使用完整加载器
  },
})

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
