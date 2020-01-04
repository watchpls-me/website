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
  import store from './store'
  // subscribe to store updates
  store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
