import { createRouter, createWebHistory } from 'vue-router'
import Top from '../views/Top.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Thanks from '../views/Thanks.vue'
import Diagnosis from '../views/Diagnosis.vue'
import Result from '../views/Result.vue'
import MyPage from '../views/MyPage.vue'
import Addmin from '../views/Addmin.vue'
import Purchase from '../views/Purchase.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Customer from '../views/CustomerInformation.vue'
import Comfirm from '../views/Comfirm.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'top',
    component: Top
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Top,
    meta: { requiresAuth: true }
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: Thanks,
    meta: { requiresAuth: true }
  },
  {
    path: '/diagnosis',
    name: 'diagnosis',
    component: Diagnosis
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/addmin',
    name: 'addmin',
    component: Addmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: Purchase,
    meta: { requiresAuth: true }
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: { requiresAuth: true }
  },
  {
    path: '/comfirm',
    name: 'comfirm',
    component: Comfirm,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach(function(to) {
  if (to.meta.requiresAuth && !store.getters.isLogin) {
    return { name: 'login' };
  }
});

export default router
