import { createWebHistory, createRouter } from 'vue-router'

import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Index.vue'
import Store from '../store'
import Order from '../views/order/Index.vue'
import DetailOrder from '../views/order/Show.vue'
import Home from '../views/home/Index.vue'
import DetailProduct from '../views/product/Show.vue'
import Categories from '../views/category/Index.vue'
import DetailCategory from '../views/category/Show.vue'
import Cart from '../views/cart/Index.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: Order,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: DetailOrder,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/product/:slug',
        name: 'detail_product',
        component: DetailProduct,
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories,
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component: DetailCategory,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/404',
        name: 'forbidden',
        component: NotFound,
    },
    {
        path: '/:catchAll(.*)', 
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (Store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router