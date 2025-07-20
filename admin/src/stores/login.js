import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const isGetterRouter = ref(false)
  const changeGetterRouter = (newvalue) => {
    isGetterRouter.value = newvalue
  }
  return { 
    isGetterRouter,
    changeGetterRouter
  }
})