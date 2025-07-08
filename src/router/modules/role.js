
import Layout from "../../views/Layout/index.vue"
export default {
    path: "/role",
    // name: "Role",
    component: Layout,
    children: [
        {
            path: "",
            name: "Role",
            component: () => import("../../views/Role/index.vue")
        }
    ]
}