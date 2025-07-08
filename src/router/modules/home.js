
import Layout from "../../views/Layout/index.vue"
export default {
    path: "/home",
    component: Layout,
    children: [
        {
            path: "",
            name: "Home",
            component: () => import("../../views/Home/index.vue")
        }
    ]
}