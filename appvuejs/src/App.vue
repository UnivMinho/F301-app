<template>
  <div id="app">
    <!-- Renderiza a sidebar somente se não estiver na página de login -->
    <sidebar v-if="shouldShowSidebar" />

    <!-- Onde as rotas serão renderizadas -->
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    // Determina se a sidebar deve ser mostrada
    shouldShowSidebar() {
      // Retorna 'false' se estiver na rota de login, caso contrário 'true'
      return this.$route.path !== '/';
    }
  }
}

//teste github pages
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>./components/LoginApp.vue
