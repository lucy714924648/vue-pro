// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../views/Layout/index.vue"
import Department from "./modules/department"
import Employee from "./modules/employee"
import List from "./modules/list"
import Details from "./modules/details"
import Role from "./modules/role"
import Home from "./modules/home"


Vue.use(VueRouter)
const fixedRoutes = [
    {
        path: "",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () => (import("../views/Dashboard/index.vue"))
            }
        ]
    },
    { path: '/login', name: "login", component: () => (import('../views/Login/index.vue')) },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404/index.vue')
    }
]
const dynamicRoutes = [
    Employee,
    Department,
    Role,
    Details,
    List,
    Home
]

const router = new VueRouter({
    mode: 'history',  // 使用history模式
    base: process.env.BASE_URL,
    routes: fixedRoutes
})
// 添加动态路由
// 注意：所有子路由 path 不要以 / 开头，避免绝对路径问题
// 只添加一次


let startTime = Date.now();
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

dynamicRoutes.forEach(route => {
    if (route && typeof route === 'object' && route.path) {
        router.addRoute(route)
    } else {
        console.warn('无效路由配置', route)
    }
})
// 兜底路由，直接渲染404组件
router.addRoute({
    path: '*',
    component: () => import('../views/404/index.vue')
})
console.log(router.getRoutes());

router.beforeEach((to, from, next) => {

    // 埋点记录页面停留时间
    const timeOff = countTime(to, from);
    console.log(timeOff);
  next()
})

export default router