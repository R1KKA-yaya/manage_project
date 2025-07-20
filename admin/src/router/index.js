import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from '@/router/config'
import { useLoginStore } from '@/stores/login'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    },
    //mainbox的嵌套路由，后面通过权限动态添加
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 在路由内部获取store实例, 确保pinia已经安装好了
  const LoginStore = useLoginStore()
  // 如果要去登录页面
  if (to.name === 'login') {
    next()
  } else {
    // 如果未授权
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      if (!LoginStore.isGetterRouter) {
        router.removeRoute('mainbox')
        ConfigRouter()
        LoginStore.changeGetterRouter(true)
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  if(!router.hasRoute('mainbox')){
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }
  routesConfig.forEach(item => {
    checkPermission(item) && router.addRoute("mainbox", item)
  })
}

const checkPermission = (item) => {
  const UserStore = useUserStore()
  if(item.requireAdmin){
    return UserStore.userInfo.role === 1
  }
  return true
}

export default router
