<template>
  <div>   <!-- Containment Div : ) -->

    <v-app-bar app color="black" dark dense>    <!-- Toolbar -->
        <v-btn icon href="https://chrome.google.com/webstore/category/extensions">
          <v-icon>fab fa-chrome</v-icon>
        </v-btn>
        <div class="d-flex align-center">
            <h3>WatchPls</h3>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon @click="sheet = !sheet">
          <v-icon>fas fa-users</v-icon>
        </v-btn>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>fas fa-comment</v-icon>
        </v-btn>
    </v-app-bar>      <!-- End Toolbar -->
    
    <v-navigation-drawer v-model="drawer" app right hide-overlay bottom>    <!-- Start Chat -->
        <template v-slot:prepend>
            <v-card class="d-flex justify-space-between pa-2" flat>
                <v-card flat>
                    <v-btn icon @click.stop="drawer = !drawer">
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
    </v-navigation-drawer>      <!-- End Chat -->

    <v-bottom-sheet v-model="sheet" hide-overlay dense>   <!-- User List ? -->
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" flat color="red" @click="sheet = !sheet" icon><v-icon>fas fa-times</v-icon></v-btn>
        <div>Frwends? :3</div>
      </v-sheet>
    </v-bottom-sheet>   <!-- End User List -->

    <v-dialog v-model="dialog" width="500">   <!-- Some kind of settings? -->
      <v-card>
        <v-card-title class="headline lighten-2" primary-title>Settings?</v-card-title>

        <v-card-text>This could be settings but you playin</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = !dialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   <!-- End Settings -->

  </div>
</template>

<script>
  export default {
    name: 'Chat',
    data: () => ({
      text: '',
      drawer: null,
      sheet: null,
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