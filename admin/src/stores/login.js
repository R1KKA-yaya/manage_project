import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const isGetterRouter = ref(false)
  const changeGetterRouter = (value) => {
    isGetterRouter.value = value
  }
  return {
    isGetterRouter,
    changeGetterRouter
  }
})