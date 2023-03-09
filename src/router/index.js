import { createRouter, createWebHistory } from 'vue-router'
import Top from '../views/Top.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Thanks from '../views/Thanks.vue'
import Diagnosis from '../views/Diagnosis.vue'
import Result from '../views/Result.vue'
import MyResult from '../views/MyResult.vue'
import MyDetail from '../views/MyDetail.vue'
import MyPage from '../views/MyPage.vue'
import Addmin from '../views/Addmin.vue'
import DetailProduct from '../views/DetailProduct.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Customer from '../views/CustomerInformation.vue'
import Comfirm from '../views/Comfirm.vue'
import Mail from '../views/Mail.vue'
import store from '@/store/index.js'
import firebase from '../main';



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
    path: '/my-result',
    name: 'my-result',
    component: MyResult
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-detail',
    name: 'my-detail',
    component: MyDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/addmin',
    name: 'addmin',
    component: Addmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailProduct,
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
  {
    path: '/mail',
    name: 'mail',
    component: Mail,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach(function (to) {
  firebase
    .auth()
    .onAuthStateChanged(u => {
      let user = u ? u : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserLoginStatusChanged', user.uid ? true : false);
      if (to.meta.requiresAuth && !store.getters.isLogin) {
        return { name: 'login' };
      }
    });
});

export default router
