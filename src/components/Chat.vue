<template>
    <v-navigation-drawer
            app
            right
    >
        <template v-slot:prepend>
            <v-card>
                <v-card-text>
                    <v-text-field
                            label="Username"
                            v-model="username"
                            dense
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </template>
        <div id="serverlog" class="pa-2" v-chat-scroll>
            <v-flex xs12 v-for="msg in msgs">
                <div v-html="`<b>${msg.username}:</b> ${msg.text}`"></div>
            </v-flex>
        </div>
        <template v-slot:append>
            <div class="pa-2">
                <v-textarea
                        v-model="text"
                        :disabled="!username"
                        :placeholder="(username) ? 'Chat' : 'A username is needed to chat'"
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
      username: '',
    }),
    props: {
      msgs: {
        type: Array
      }
    },
    methods: {
      sendChat (e) {
        if (e.keyCode === 13 && !e.shiftKey)
          e.preventDefault()
        this.$parent.sendMsg({username: this.username, text: this.text})
        this.text = ''
      }
    }
  }
</script>

<style scoped>
    #serverlog{
        height: 100%;
        width: 100%;
        overflow: auto;
        overflow-wrap: break-word;
        top: 0;
        bottom: 3em;
    }
</style>