<template>
  
  <q-page-container class="page">
    <section class="contTraer">
      <!-- <input class="input" type="text" placeholder="N: Pokemon"> -->
      <button class="traer" @click="traerProximoPokemon()">Traer datos</button>
    </section>
    <section v-if="mostrarDatos" class="pageHijo">
      <ul class="pokemons">
        <img class="pokeGif"
          v-if="pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other.showdown && pokemon.sprites.other.showdown.front_default"
          :src="pokemon.sprites.other.showdown.front_default" alt="Pokemon gif 1">
        <img class="pokemon" v-if="pokemon.sprites" :src="getShinySpriteUrl(pokemon.sprites)" alt="Shiny Pokemon">
        <img class="pokeGif"
          v-if="pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other.showdown && pokemon.sprites.other.showdown.back_default"
          :src="pokemon.sprites.other.showdown.back_default" alt="Pokemon gif 2">
      </ul>

      <div class="container">
        <ul class="stats-container">
          <li v-for="(stat, index) in pokemon.stats" :key="index" class="stat">
            <span>{{ statsTraduccion[stat.stat.name] }}: {{ stat.base_stat }}</span>
            <div class="stat-bar" :style="{ width: stat.base_stat * 2 + 'px' }"></div>
          </li>
        </ul>
      </div>
    </section>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

// Define las traducciones y la estructura de datos de los Pokémon
const statsTraduccion = {
hp: 'Hp',
attack: 'Ataque',
defense: 'Defensa',
'special-attack': 'Ataque Especial',
'special-defense': 'Defensa Especial',
speed: 'Velocidad'
};

const tipoTraduccion = {
normal: 'Normal',
fighting: 'Lucha',
flying: 'Volador',
poison: 'Veneno',
ground: 'Tierra',
rock: 'Roca',
bug: 'Bicho',
ghost: 'Fantasma',
steel: 'Acero',
fire: 'Fuego',
water: 'Agua',
grass: 'Planta',
electric: 'Eléctrico',
psychic: 'Psíquico',
ice: 'Hielo',
dragon: 'Dragón',
dark: 'Siniestro',
fairy: 'Hada'
};

// Define las referencias reactivas para el Pokémon y la visibilidad de los datos
const pokemon = ref({
name: '',
id: null,
stats: [],
sprites: null,
height: null,
weight: null,
types: []
});

const mostrarDatos = ref(false);

// Función para obtener la URL de la imagen "back_default" del sprite del Pokémon
const getShinySpriteUrl = (sprites) => {
if (sprites && sprites.other && sprites.other['official-artwork'] && sprites.other['official-artwork'].front_default) {
  return sprites.other['official-artwork'].front_default;
} else {
  // Si la imagen no está disponible, retorna una URL de imagen predeterminada o una cadena vacía
  return ''; // O puedes establecer una imagen predeterminada aquí
}
};

// Función para traer los datos del próximo Pokémon
const traerProximoPokemon = async () => {
try {
  const numeroPokemon = Math.floor(Math.random() * 898) + 1; // Obtener un número de Pokémon aleatorio entre 1 y 898
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`);
  const data = await response.json();
  pokemon.value.name = data.name;
  pokemon.value.id = data.id;
  pokemon.value.stats = data.stats;
  pokemon.value.sprites = data.sprites;
  pokemon.value.height = data.height;
  pokemon.value.weight = data.weight;
  // Mapear y traducir los tipos después de obtener los datos del Pokémon
  pokemon.value.types = data.types.map(type => {
    return { type: { name: tipoTraduccion[type.type.name] || type.type.name } };
  });

  mostrarDatos.value = true;
  console.log(data);
} catch (error) {
  console.log(error);
}
}
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
width: 120px !important;
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
background-color: #50a2efaf;
}

.pokemons {
width: 40rem;
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

.stat {padding-right: 200px;
width: 90%;
/* Ancho del contenedor de estadísticas */
}

.stat-bar {
/* Ancho máximo de la barra de estadísticas */
height: 20px;
border: 1px solid yellow;
background-color: blue;
flex-grow: 1;
/* Hace que las barras se expandan automáticamente */
}
</style>
