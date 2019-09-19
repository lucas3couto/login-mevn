import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/Auth'
import Home from '@/components/Home'
import ForgotPassword from '@/components/ForgotPassword'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'forgotPassword',
    path: '/forgot-password',
    component: ForgotPassword
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router