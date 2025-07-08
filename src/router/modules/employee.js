
import Layout from "../../views/Layout/index.vue"
export default {
    path: "",
    // name: "Employee",
    component: Layout,
    children: [
        {
            path: "employee",
            name: "Employee",
            component: () => import("../../views/Employee/index.vue"),
            children: [
                {
                    path: "detail/:id?",
                    name: "Detail",
                    component: () => import("../../views/Employee/Detail.vue")
                }
            ]
        },
    ]
}