<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Welcome from './components/Welcome.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Welcome />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/poli">Poli</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
