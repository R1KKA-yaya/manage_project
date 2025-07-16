import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref()
  // 添加更新用户信息的 action
  const updateUserInfo = (value) => {
    userInfo.value = {
      ...userInfo.value,
      ...value
    }
  }
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return { 
    userInfo,
    updateUserInfo,
    clearUserInfo
  }
},{
  persist:true
}) 