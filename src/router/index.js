import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui';
import login from '../views/login/loginMall.vue';
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
    component: () => import('../views/login/loginMall.vue')
  },
  {
    path: '/mall/home',
    name: 'home',
    component: () => import('../views/home/mallHome.vue')
  },
  {
    path: '/mall/search',
    name: 'search',
    component:  () => import("../views/search/searchProduct.vue")
  },
  {
    path: '/mall/lookProduct',
    name: 'lookProduct',
    component:  () => import("../views/look/productMessage.vue")
  },
  {
    path: '/mall/cart',
    name: 'cart',
    component:  () => import("../views/cart/cart.vue")
  },
  {
    path: '/mall/pay',
    name: 'pay',
    component:  () => import("../views/pay/pay.vue")
  },
  {
    path: '/mall/paySuccess',
    name: 'pay',
    component:  () => import("../views/pay/paySuccess.vue")
  }
]



const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/' || to.path === '/reg' || to.path === '/login') {
//     return next()
//   } else {
//     let user = localStorage.getItem('token')
//     if (user != null) {
//       //校验token
//       return next()
//     } else {
//       Message.error('用户未登录')
//       return next('/')
//     }
//   }
// })
export default router
