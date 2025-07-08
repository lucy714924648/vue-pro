
import Layout from "../../views/Layout/index.vue"

export default {
    path: "/list",
    component: Layout,
    children: [
        {
            path: "",
            name: "List",
            meta:{
                keepAlive: true 
            },
            component: () => import("../../views/List/index.vue")
        }
    ]
}