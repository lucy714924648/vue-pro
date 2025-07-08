import Layout from "../../views/Layout/index.vue"

export default {
    path: "",
    // name: "Department",
    component: Layout,
    children: [
        {
            path: "/Details",
            name: "Details",
            component: () => import("../../views/Details/index.vue")
        }
    ]
}