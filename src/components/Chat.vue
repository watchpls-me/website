<template>
    <v-navigation-drawer
            app
            right
    >
        <template v-slot:append>
            <div class="pa-2">
                <v-textarea
                        v-model="text"
                        placeholder="Chat"
                        auto-grow
                        rows="1"

                        v-on:keydown.enter.exact="sendChat"
                ></v-textarea>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Chat',
    data: () => ({
      text: '',
    }),
    methods: {
      sendChat (e) {
        if (e.keyCode === 13 && !e.shiftKey)
          e.preventDefault()
        this.$parent.sendMsg(this.text)
        this.text = ''
      }
    }
  }
</script>

<style scoped>

</style>