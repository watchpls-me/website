<template>
    <v-app-bar app color="black" dark dense>
        <div class="d-flex align-center" @click="$router.push({name: 'home'})" :style="{ cursor: 'pointer'}">
            <v-img
                    class="shrink mr-2"
                    src="@/assets/fox-logo.png"
                    transition="scale-transition"
                    width="32"
            />
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