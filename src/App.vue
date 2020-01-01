<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-content>
      <router-view></router-view>
    </v-content>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<style>
  html {
    overflow-y: auto;
  }
</style>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
