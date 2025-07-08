
import Layout from "../../views/Layout/index.vue"
export default {
    path: "/employee", // 一级路由必须以 / 开头
    component: Layout,
    children: [
        {
            path: "", // 访问 /employee 时渲染
            name: "Employee",
            component: () => import("../../views/Employee/index.vue")
        },
        {
            path: "detail/:id?", // 访问 /employee/detail/:id? 时渲染
            name: "Detail",
            component: () => import("../../views/Employee/Detail.vue")
        }
    ]
}