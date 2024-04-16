import Compra from "../components/Compra.vue"
import Venta from "../components/Venta.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/compra", component: Compra },
    { path: "/", component: Venta },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
