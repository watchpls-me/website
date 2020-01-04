<template>
    <v-app-bar app color="black" dark dense>
        <v-btn icon href="https://chrome.google.com/webstore/category/extensions">
            <v-icon>fab fa-chrome</v-icon>
        </v-btn>
        <div class="d-flex align-center">
            <h3>WatchPls</h3>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon @click="$store.dispatch('toggleFriends')">
            <v-icon>fas fa-users</v-icon>
        </v-btn>
        <v-btn v-if="!$store.state.settings.chatWindow" icon @click.stop="$store.dispatch('toggleChat')">
            <v-icon>fas fa-comment</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>

  export default {
    name: 'Toolbar'
  }
</script>

<style scoped>

</style>