<template>
    <div class="pokemon-info">
        <h2>Bienvenido a PokéInfo</h2>
        <p>Descubre información interesante sobre los Pokémon aquí.</p>
        <div class="pokemon-fact">
            <h3>¡Sabías que hay {{ totalPokemon }} Pokémon?</h3>
            <p>¡Explora el mundo Pokémon y conviértete en un maestro Pokémon!</p>
            <h3>¿Qué es un Pokémon?</h3>
            <p>Los Pokémon son criaturas ficticias que habitan en un mundo lleno de aventuras. Cada Pokémon tiene
                habilidades únicas y pertenece a uno o más tipos de Pokémon, como fuego, agua, planta, etc.</p>
            <h3>Tipos de Pokémon</h3>
            <p>Existen varios tipos de Pokémon, cada uno con sus propias fortalezas y debilidades. Algunos tipos comunes
                incluyen:</p>
            <ul>
                <li>Fuego</li>
                <li>Agua</li>
                <li>Planta</li>
                <li>Eléctrico</li>
                <li>Hielo</li>
                <li>Lucha</li>
                <li>Psíquico</li>
                <li>Volador</li>
                <li>Dragón</li>
                <li>Hada</li>
            </ul>
            <h3>Curiosidades Pokémon</h3>
            <ul>
                <li>El Pokémon más alto es Wailord, que mide 14.5 metros.</li>
                <li>El Pokémon más pequeño es Joltik, que mide solo 0.1 metros.</li>
                <li>El primer Pokémon de la Pokédex nacional es Bulbasaur.</li>
                <li>Hay Pokémon legendarios que son extremadamente raros y poderosos, como Mewtwo y Arceus.</li>
                <li>¡Hay mucho más por descubrir en el mundo Pokémon!</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const totalPokemon = 898; // Total de Pokémon conocidos hasta ahora
</script>

<style>
* {
    box-sizing: border-box;
}

.pokemon-info {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
    padding-top: 100px;
    padding-bottom: 100px;
}

.pokemon-fact {
    margin-top: 20px;
    padding: 10px;
    background-color: #f8f9fa;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.pokemon-fact ul {
    padding-left: 20px;
}

.pokemon-fact li {
    margin-bottom: 5px;
}
</style>