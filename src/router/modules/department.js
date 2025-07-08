import Layout from "../../views/Layout/index.vue"

export default {
    path: "",
    // name: "Department",
    component: Layout,
    children: [
        {
            path: "/department",
            name: "Department",
            component: () => import("../../views/Department/index.vue")
        }
    ]
}