import Pokedex from "../components/Pokedex.vue"
import Juego from "../components/Juego.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/pokedex", component: Pokedex },
    { path: "/", component: Juego },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
