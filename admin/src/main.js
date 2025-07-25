import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"; 

import App from './App.vue'
import router from './router'
import '@/util/axios.config'

const app = createApp(App)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(Particles, {
  init: async engine => {
    await loadFull(engine);  // 使用完整加载器
  },
})

app.use(ElementPlus)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
