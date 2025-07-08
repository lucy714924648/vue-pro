
import Layout from "../../views/Layout/index.vue"
export default {
    path: "",
    // name: "Details",
    component: Layout,
    children: [
        {
            path: "/details",
            name: "Details",
            component: () => import("../../views/Details/index.vue")
        }
    ]
}