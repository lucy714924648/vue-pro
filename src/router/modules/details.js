
import Layout from "../../views/Layout/index.vue"
export default {
    path: "/details",
    // name: "Details",
    component: Layout,
    children: [
        {
            path: "",
            name: "Details",
            component: () => import("../../views/Details/index.vue")
        }
    ]
}