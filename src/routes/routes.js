import Compra from "../components/Compra.vue"
import Venta from "../components/Venta.vue"
import Login from "../components/Login.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/compra", component: Compra },
    { path: "/venta", component: Venta },
    { path: "/", component: Login }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})