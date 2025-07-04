import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
  const isCollapsed = ref(false)
  return { isCollapsed }
},
{
    persist: true,
})