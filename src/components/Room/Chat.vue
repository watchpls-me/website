<template>
  <div>   <!-- Containment Div : ) -->

    <v-navigation-drawer id="chatDrawer" v-model="$store.state.settings.chatWindow" app right hide-overlay bottom>    <!-- Start Chat -->

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" attach="#chatDrawer">   <!-- Some kind of settings? -->
            <v-card>
                <v-card-title class="headline lighten-2" primary-title>Settings</v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h3 class="pa-2">Name color</h3>
                            <v-color-picker
                                    v-model="userColor"
                                    hide-mode-switch
                                    hide-inputs
                                    flat
                            />
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = !dialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>   <!-- End Settings -->

        <template v-slot:prepend>
            <v-card class="d-flex justify-space-between pa-2" flat>
                <v-card flat>
                    <v-btn icon @click.stop="$store.dispatch('toggleChat')">
                        <v-icon>fas fa-chevron-right</v-icon>
                    </v-btn>
                </v-card>
                <v-card class="pt-1" flat><h3>Chat</h3></v-card>
                <v-card flat>
                    <v-btn icon @click="dialog = !dialog">
                        <v-icon>fas fa-cog</v-icon>
                    </v-btn>
                </v-card>
            </v-card>
        </template>
        <div id="chat" class="pa-2" v-chat-scroll></div>
        <template v-slot:append>
            <div class="pa-2">
                <v-textarea
                        v-model="text"
                        :disabled="!username"
                        :placeholder="(username) ? 'Chat' : 'A username is needed to chat'"
                        auto-grow
                        rows="1"
                        outlined
                        dense
                        v-on:keydown.enter.exact="sendChat"
                />
            </div>
        </template>
    </v-navigation-drawer>      <!-- End Chat -->

    <v-bottom-sheet v-model="$store.state.settings.friendSheet" hide-overlay dense>   <!-- User List ? -->
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="$store.dispatch('toggleFriends')" icon><v-icon>fas fa-times</v-icon></v-btn>
        <div>Frwends? :3</div>
      </v-sheet>
    </v-bottom-sheet>   <!-- End User List -->

  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'Chat',
    data: () => ({
      text: '',
      userColor: '#FFFFFF',
      dialog: null,
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
    watch: {
      msgs (newVal) {

        const msg = newVal[newVal.length-1]
        const now = moment().format('h:mm')

        const usernameDiv = document.createElement('span')
        const contentDiv = document.createElement('span')
        const endLineDiv = document.createElement('div')

        usernameDiv.innerHTML = `<small>${now}</small> <b style="color: ${msg.author.color};">${msg.author.name}</b>: `

        contentDiv.textContent = `${msg.content}`

        document.getElementById("chat").appendChild(usernameDiv)
        document.getElementById("chat").appendChild(contentDiv)
        document.getElementById("chat").appendChild(endLineDiv)

        twemoji.parse(document.getElementById("chat"))
      }
    },
    methods: {
      sendChat (e) {
        if (e.keyCode === 13 && !e.shiftKey)
          e.preventDefault()
        this.$parent.sendMsg({
          room: this.$route.params.id,
          author: { name: this.username, color: this.userColor },
          content: this.text
        })
        this.text = ''
      }
    },
    beforeMount () {
      if (this.$store.state.settings.friendSheet)
        this.$store.dispatch('toggleFriends')
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