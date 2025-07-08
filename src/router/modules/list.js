
import Layout from "../../views/Layout/index.vue"

export default {
    path: "",
    component: Layout,
    children: [
        {
            path: "/list",
            name: "List",
            meta:{
                keepAlive: true 
            },
            component: () => import("../../views/List/index.vue")
        }
    ]
}