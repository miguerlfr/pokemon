<template>
    <q-page-container class="page">
        <section class="contTraer">
            <label class="label" for="nombrePokemon">¿Quién es este Pokémon?</label>
            <input id="nombrePokemon" v-model="nombreIngresado" class="input" type="text"
                placeholder="Nombre Pokemon" />
            <button class="nuevoPokemon" @click="traerProximoPokemon()" :disabled="!puedeMostrarNuevoPokemon">
                Jugar De Nuevo
            </button>
            <button class="verificarPokemon" @click="verificarPokemon()">Verificar</button>
        </section>
        <section v-if="mostrarDatos" class="pageHijo">
            <ul class="pokemons">
                <img class="pokeGif"
                    v-if="pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other.showdown && pokemon.sprites.other.showdown.front_default"
                    :src="pokemon.sprites.other.showdown.front_default" alt="Pokemon gif 1"
                    :style="{ filter: pokemonColor ? 'brightness(100%)' : 'brightness(0%)' }" />
                <img class="pokemon" v-if="pokemon.sprites" :src="getShinySpriteUrl(pokemon.sprites)"
                    alt="Shiny Pokemon" :style="{ filter: pokemonColor ? 'brightness(100%)' : 'brightness(0%)' }" />
                <img class="pokeGif"
                    v-if="pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other.showdown && pokemon.sprites.other.showdown.back_default"
                    :src="pokemon.sprites.other.showdown.back_default" alt="Pokemon gif 2"
                    :style="{ filter: pokemonColor ? 'brightness(100%)' : 'brightness(0%)' }" />
            </ul>
            <div class="container">
                <ul class="stats-container">
                    <li v-for="(stat, index) in pokemon.stats" :key="index" class="stat">
                        <span>{{ statsTraduccion[stat.stat.name] }}: {{ stat.base_stat }}</span>
                        <div class="stat-bar" :style="{ width: stat.base_stat * 2.5 + 'px' }"></div>
                    </li>
                </ul>
            </div>
        </section>
    </q-page-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";

const mostrarDatos = ref(false);
const pokemon = ref({});
const nombreIngresado = ref("");
const pokemonColor = ref(false); // Variable para controlar si mostrar los Pokémon a color o en blanco y negro
const puedeMostrarNuevoPokemon = ref(true); // Variable para controlar si se puede mostrar un nuevo Pokémon

const statsTraduccion = {
    hp: "Hp",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defensa Especial",
    speed: "Velocidad",
};

const tipoTraduccion = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
};

const traerProximoPokemon = async () => {
    try {
        // Obtener un número de Pokémon aleatorio entre 1 y 898
        const numeroPokemon = Math.floor(Math.random() * 898) + 1;

        // Realizar la solicitud HTTP para obtener los datos del Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`);
        const data = response.data;

        // Actualizar los datos del Pokémon
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

        // Restablecer el brillo de las imágenes y gifs del Pokémon a blanco y negro
        pokemonColor.value = false;

        // Limpiar el contenido del input
        nombreIngresado.value = "";
        
        // Mostrar los datos del Pokémon
        mostrarDatos.value = true;

        // Deshabilitar la opción de mostrar un nuevo Pokémon hasta que se adivine el actual
        puedeMostrarNuevoPokemon.value = false;

        // Mostrar el nombre del Pokémon en la consola para depuración
        console.log("Nombre del Pokémon a adivinar:", pokemon.value.name);
    } catch (error) {
        // Manejar cualquier error de la solicitud HTTP
        console.error(error);
    }
};

const verificarPokemon = () => {
    const nombreIngresadoLowerCase = nombreIngresado.value.toLowerCase();
    const nombrePokemonLowerCase = pokemon.value.name.toLowerCase();
    if (nombreIngresadoLowerCase === nombrePokemonLowerCase) {
        mostrarNotificacion("¡Felicidades! Adivinaste el Pokémon", "positive");
        puedeMostrarNuevoPokemon.value = true; // Habilitar el botón "Nuevo Pokémon" nuevamente
        // Mostrar las imágenes y gifs a color si se adivina correctamente
        pokemonColor.value = true;
    } else {
        mostrarNotificacion("Vuelve a intentar", "negative");
        // Si no se adivina correctamente, las imágenes y gifs siguen en blanco y negro
        pokemonColor.value = false;
    }
};


const getShinySpriteUrl = (sprites) => {
    if (sprites && sprites.other && sprites.other["official-artwork"] && sprites.other["official-artwork"].front_default) {
        return sprites.other["official-artwork"].front_default;
    } else {
        return "";
    }
};

const mostrarNotificacion = (mensaje, tipo) => {
    Notify.create({
        message: mensaje,
        position: "top",
        color: "white",
        timeout: 3000,
    });
};

traerProximoPokemon();
</script>

<style>
.label {
    font-size: 20px;
}

.contTraer {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.input {
    border: 1px solid black;
    padding-left: 7.5px;
    width: 130px;
}

.input .nuevoPokemon .verificar {
    background-color: white !important;
    color: black !important;
    margin: 0 !important;
}

.color {
    background-color: #50a2ef;
}

.pokemon {
    margin-left: 0.5%;
    width: 320px !important;
    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.82));
    margin-bottom: -80px !important;
    margin-top: -63px;
}

.pokeGif {
    width: 60px;
    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.82));
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
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #50a2efaf;
    margin-top: 30px;
}

.pokemons {
    height: 200px;
    text-align: center;
    margin-right: 3%;
}

.container {
    /* Ancho del contenedor */
    display: flex;
    justify-content: center;
    /* Centra horizontalmente */
}

.stats-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
}

.stat {
    width: 90%;
    /* Ancho del contenedor de estadísticas */
}

.stat-bar {
    /* Ancho máximo de la barra de estadísticas */
    height: 20px;
    background-color: rgba(0, 0, 255, 0.397);
    flex-grow: 1;
    border: transparent;
    /* Hace que las barras se expandan automáticamente */
}

.adivinar {
    border: 2px solid transparent;
    /* Establece un borde inicial transparente */
    padding: 10px 20px;
    background-color: transparent;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    /* Elimina el resaltado del botón al hacer clic */
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

@media (max-width: 950px) or (max-height: 575px) {
    .pokemon {
        width: 230px !important;
        margin-top: -16px;
    }

    .pokeGif {
        margin-bottom: -30px;
    }

    .stats-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        font-size: 12px;
    }

    .stat-bar {
        height: 10px;
    }
}

@media (max-width: 901px) {
    .pokemon {
        width: 180px !important;
        margin-top: 26px;
    }
}

@media (max-width: 850px) {
    .pokemon {
        margin-left: 260px;
    }

    .pokeGif {
        display: none;
    }

    .stats-container {
        margin-right: 200px;
    }
}
</style>
