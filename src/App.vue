<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-content>
      <router-view></router-view>
    </v-content>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
