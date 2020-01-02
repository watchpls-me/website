<template>
    <v-navigation-drawer
            v-model="drawer"
            app
            right
            hide-overlay
            bottom
    >
        <template v-slot:prepend>
            <v-card class="d-flex justify-space-between pa-2" flat>
                <v-card flat>
                    <v-btn icon>
                        <v-icon>fas fa-chevron-right</v-icon>
                    </v-btn>
                </v-card>
                <v-card class="pt-1" flat><h3>Chat</h3></v-card>
                <v-card flat>
                    <v-btn icon>
                        <v-icon>fas fa-users</v-icon>
                    </v-btn>
                </v-card>
            </v-card>
        </template>
        <div id="chat" class="pa-2" v-chat-scroll>
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
      drawer: true,
      text: '',
    }),
    props: {
      username: {
        value: String,
        default: ''
      },
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
    #chat {
        height: 100%;
        width: 100%;
        overflow: auto;
        overflow-wrap: break-word;
        top: 0;
        bottom: 3em;
    }
</style>