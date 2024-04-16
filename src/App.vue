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
      <router-link class="b" to="/compra">Compra</router-link><br />
      <router-link class="b" to="/">Venta</router-link>
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

  </q-layout>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>

<style scoped>
.b {
    color: black !important;
}

</style>
