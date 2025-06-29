// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import About from '../views/About/index.vue'
import SlotComp from '../views/SlotComp/index.vue'
import Employee from '../views/Employee/index.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/about',
                name: 'About',
                component: About
            },
            {
                path: '/role',
                name: 'Role',
                component: () => import('../views/Role/index.vue')
            },
            {
                path: '/department',
                name: 'Department',
                component: () => import('../views/Department/index.vue')
            },
            {
                path: '/employee',
                name: 'Employee',
                component: Employee,
                children: []
            },
            {
                path: '/employee/detail/:id?',
                name: 'Detail',
                component: () => import('../views/Employee/Detail.vue'),
            },
            {
                path: '/slot',
                name: 'SlotComp',
                component: SlotComp
            },
            // 懒加载方式
            {
                path: '/list',
                name: 'List',
                component: () => import('../views/List/index.vue')
            },
            {
                path: '/details',
                name: 'Details',
                component: () => import('../views/Details/index.vue')
            }
        ]
    },


]

const router = new VueRouter({
    mode: 'history',  // 使用history模式
    base: process.env.BASE_URL,
    routes
})
let startTime = Date.now();
//js注释
/**
 * 页面停留时间
 * @author jiajia<712@mail.com>
 * @license Apache-2.0 版本
 * @param {import('vue-router').Route} to 当前页
 * @param {import('vue-router').Route} from 来自哪个页面
 * @return {Date} 页面停留时间
 */
const countTime = (to, from) => {
    const currentTime = Date.now();
    console.log(
        '用户由',
        from.path,
        '页面 跳转到',
        to.path,
        '页面 在',
        from.path,
        '页面停留了',
        currentTime - startTime,
        '毫秒。转化成秒为：',
        (currentTime - startTime) / 1000
    );
    startTime = Date.now();
    console.log("--==============分割线========-");
    return (currentTime - startTime) / 1000

}
// 记录路由历史
const history = window.sessionStorage
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach((to, from, next) => {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex) > parseInt(fromIndex)) {
            // 前进
            to.meta.isBack = false
        } else {
            // 后退
            to.meta.isBack = true
        }
    } else {
        // 新页面
        ++historyCount
        history.setItem('count', historyCount)
        to.meta.isBack = false
        history.setItem(to.path, historyCount)
    }
    //埋点记录页面停留时间
    const timeOff = countTime(to, from);
    console.log(timeOff);
    next()
})

export default router