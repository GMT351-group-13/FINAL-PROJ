<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <div class="d-flex">
            <RouterLink class="navbar-brand me-4" to="/cafes">Places</RouterLink>
            <RouterLink class="navbar-brand" to="/users">Users</RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
