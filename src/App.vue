<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>Shop App</h2>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/borrowers">Borrowers</RouterLink>
        <RouterLink to="/category">Categories</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  background: rgb(252, 233, 233);
}

.logo {
  display: inline-block;
  width: 20px;
}

nav {
  width: 100%;
  display: flex;
  font-size: 12px;
}

nav a.router-link-exact-active {
  color: black;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
h2 {
  font-weight: 800;
  font-size: large;
}
</style>
