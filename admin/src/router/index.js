import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from '@/router/config'
import { useLoginStore } from '@/stores/login'

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
  console.log('路由守卫触发:',
    `从 ${from.path} 到 ${to.path}`,
    `完整路径: ${to.fullPath}`,
    `是否刷新: ${performance.navigation.type === 1 ? '是' : '否'}`
  )
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
  routesConfig.forEach(item => {
    router.addRoute("mainbox", item)
  })
}

export default router
