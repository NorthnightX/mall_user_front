import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui';
import login from '../views/login/loginBlog.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: login,
    hidden: true,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/loginBlog.vue')
  },
  {
    path: '/blog/home',
    name: 'home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/blog/search',
    name: 'search',
    component:  () => import("../views/search/searchPage.vue")
  },
  {
    path: '/blog/lookBlog',
    name: 'look',
    component:  () => import("../views/look/lookBlog.vue")
  },
  {
    path: '/blog/blogEditor',
    name: 'look',
    component:  () => import("../views/editor/blogEditor.vue")
  }
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/reg') {
    return next()
  } else {
    let user = sessionStorage.getItem('token')
    if (user != null) {
      //校验token
      return next()
    } else {
      Message.error('用户未登录')
      return next('/')
    }
  }
})
export default router
