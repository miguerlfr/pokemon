<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="color">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <img class="pokeApi" src="./img/logo.png">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <div class="drawer-links">
        <router-link class="b" to="/pokedex">Pokedex</router-link><br />
        <router-link class="b" to="/">Juego</router-link>
        <img class="pkachu" src="./img/pikachuDeTela.png">
      </div>
    </q-drawer>

    <q-page-container class="page">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar class="color">
        <q-toolbar-title class="contPokebola">
          <img class="pokeBola" src="./img/pokebola.png">
          <p class="copy">Copyright 2024 Mi Empresa. Todos los derechos reservados.</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <div class="background-container">
      <!-- Imágenes duplicadas generadas dinámicamente -->
      <div class="displayFlex" v-for="index in numberOfImages" :key="index">
        <img class="barra" src="./img/barra.png">
      </div>
    </div>

  </q-layout>
</template>

<script setup>
import { ref } from "vue"

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const numberOfImages = ref(1000);
</script>

<style scoped>
.pkachu {
  margin-top: 90px;
  transform: rotate(-20deg); /* Rotación de 90 grados en sentido contrario a las agujas del reloj (hacia la izquierda) */
}

.background-container {
  border: 1px solid red;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  overflow-y: hidden;
  height: 100vh;
}

.barra {
  width: 140px;
}

.displayFlex {
  flex-wrap: wrap;
}

.b {
  color: blue !important;
}

.drawer-links {
  text-align: center !important;
  font-size: 20px !important;
  /* Centra los enlaces horizontalmente */
  overflow: hidden;
  margin-top: 20px;
}

.copy {
  margin-bottom: 15px;
}

.pokeBola {
  margin-top: -8px;
  margin-bottom: -8px;
}
</style>
