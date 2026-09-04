<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold" style="cursor: pointer" @click="$router.push('/')">
        Articles System
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Статьи</v-btn>
      <v-btn text to="/analytic">Аналитика</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default { name: 'App' };
</script>