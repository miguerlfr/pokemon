<template>
    <div>
        <section>hola</section>
    </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

</script>

<style>
* :not(.traer) {
    color: black;
    margin: 0;
}

.contTraer {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.input {
    border: 1px solid v;
    padding-left: 10px;
    width: 130px;
}

.color {
    background-color: #50a2ef;
}

.pokemon {
    margin-left: 0.5%;
    width: 220px;
    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.82));
}

.pokeGif {
    width: 70px;
    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.82));
}

.pokeApi {
    width: 100px;
    margin-top: 8px;
    margin-right: 90%;
}

.pokeBola {
    width: 50px;
    margin-top: 8px;
}

.page {
    background-color: rgba(255, 255, 255, 0.61);
    bottom: 150px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
    padding: 30px;
    overflow-y: auto;
    z-index: 999;
}

.page ul {
    list-style: none;
}

.pageHijo {
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 70rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.pokemons {
    width: 40rem;
    height: 100%;
    text-align: center;
}

.contPokebola {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

.copy {
    font-size: 16px;
    margin-top: 18px;
}

button {
    border: 2px solid transparent;
    /* Establece un borde inicial transparente */
    padding: 10px 20px;
    background-color: transparent;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    /* Elimina el resaltado del botón al hacer clic */
}

button {
    animation: brillar 2s infinite;
    /* Aplica el efecto de animación brillar de manera continua */
}

/* Efecto brillante */
@keyframes brillar {
    0% {
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.7);
    }

    50% {
        box-shadow: 0 0 15px rgba(0, 0, 255, 0.7);
    }

    100% {
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.7);
    }
}

.container {
    /* Ancho del contenedor */
    display: flex;
    justify-content: center;
    width: 30rem;
    /* Centra horizontalmente */
}

.stats-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
}

.stat {
    width: 90%;
    /* Ancho del contenedor de estadísticas */
}

.stat-bar {
    /* Ancho máximo de la barra de estadísticas */
    height: 20px;
    border: 1px solid yellow;
    flex-grow: 1;
    /* Hace que las barras se expandan automáticamente */
}
</style>