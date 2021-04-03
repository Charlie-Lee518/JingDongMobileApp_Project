import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/orderConfirmation/:id/:addressId?',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: () => import(/* webpackChunkName: "personalInfo" */ '../views/personalInfo/PersonalInfo')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/myAddressList',
    name: 'MyAddressList',
    component: () => import(/* webpackChunkName: "myAddressList" */ '../views/myAddressList/MyAddressList')
  },
  {
    path: '/chooseAddressList/:shopId',
    name: 'ChooseAddressList',
    component: () => import(/* webpackChunkName: "chooseAddressList" */ '../views/chooseAddressList/ChooseAddressList')
  },
  {
    path: '/upsertAddress/:id?',
    name: 'UpsertAddress',
    component: () => import(/* webpackChunkName: "upsertAddress" */ '../views/upsertAddress/UpsertAddress')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    // 进入到该路由之前执行
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由切换跳转时执行
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})
export default router
