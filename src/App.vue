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
  img.emoji {
    height: 1.5em;
    width: 1.52em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
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
