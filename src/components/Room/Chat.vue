<template>
    <div>   <!-- Containment Div : ) -->

        <v-navigation-drawer id="chatDrawer" v-model="$store.state.settings.chatWindow" app right hide-overlay bottom>
            <!-- Start Chat -->

            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"
                      attach="#chatDrawer">   <!-- Some kind of settings? -->
                <v-card>
                    <v-card-title class="headline lighten-2" primary-title>
                        <span>Settings</span>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = !dialog">Close</v-btn>
                    </v-card-title>

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

            <div id="chat" class="pa-2" v-chat-scroll>
                <v-flex xs12 v-for="msg in msgs" class="mb-2">
                    <small>{{ new Date() | moment('h:mm') }} </small>
                    <b :style="`color: ${msg.author.color};`">{{ msg.author.name }}</b>:
                    <span> {{ msg.content }}</span>
                </v-flex>
            </div>

            <template v-slot:append>
                <div class="pa-2">
                    <v-menu v-model="emojiGuessMenu" top offset-y flat>
                        <template v-slot:activator="{ on: menu1 }">
                            <v-menu
                                    v-model="emojiMenu"
                                    :close-on-content-click="false"
                                    offset-x
                                    left
                            >
                                <template v-slot:activator="{ menu2 }">
                                    <v-textarea
                                            v-model="text"
                                            id="chatTextField"
                                            :disabled="!username"
                                            :placeholder="(username) ? 'Chat' : 'A username is needed to chat'"
                                            append-icon="fas fa-smile"
                                            @click:append="emojiMenu = !emojiMenu"
                                            rows="1"
                                            auto-grow
                                            v-on:keydown.enter.exact="sendChat"
                                    />
                                </template>
                                <Picker
                                        :data="emojiIndex"
                                        set="twitter"
                                        title="Pick your emoji…"
                                        emoji="flushed"
                                        @select="addEmoji"
                                ></Picker>
                            </v-menu>
                        </template>
                        <v-list id="emojiGuessMenu" v-if="emojiGuesses.length">
                            <v-list-item
                                    v-for="(emoji, index) in emojiGuesses.slice(0, 3)"
                                    :key="emoji.colons"
                                    @click="processEmoji(emoji)"
                            >
                                <v-list-item-title>{{ `${emoji.native} ${emoji.colons}` }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </template>
        </v-navigation-drawer>      <!-- End Chat -->

        <v-bottom-sheet v-model="$store.state.settings.friendSheet" hide-overlay dense>   <!-- User List ? -->
            <v-sheet class="text-center" height="200px">
                <v-btn class="mt-6" text color="red" @click="$store.dispatch('toggleFriends')" icon>
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
                <div>User List</div>
                <div>Coming Soon!</div>
            </v-sheet>
        </v-bottom-sheet>   <!-- End User List -->

    </div>
</template>

<script>
  import data from 'emoji-mart-vue-fast/data/all.json'
  import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
  let emojiIndex = new EmojiIndex(data)
  import 'emoji-mart-vue-fast/css/emoji-mart.css'

  export default {
    name: 'Chat',
    components: { Picker },
    data: () => ({
      text: '',
      userColor: '#FFFFFF',
      dialog: null,
      emojiMenu: false,
      emojiGuessMenu: false,
      inProcessEmoji: '',
      emojiGuesses: [],
      emojiIndex: emojiIndex,
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
      text () {
        // find emojis
        const regex1 = /(:[a-zA-Z0-9_-]{2,})/g
        const regex2 = /(:[\s\S]*:)/g
        this.inProcessEmoji = this.text.match(regex1)
        const finalEmoji = this.text.match(regex2)

        this.emojiGuessMenu = false
        // emoji is being typed :em...
        if (this.inProcessEmoji) {
          this.emojiGuesses = emojiIndex.search(this.inProcessEmoji[0].substr(1))
          if (this.emojiGuesses.length)
            this.emojiGuessMenu = true
          // dont look
          setTimeout(() => twemoji.parse(document.getElementById('emojiGuessMenu')), 100)
        }
        // emoji is typed :emoji:
        if (finalEmoji) {
          const emojiName = finalEmoji[0].substring(1, finalEmoji[0].length - 1)
          this.text = this.text.replace(finalEmoji[0], '')
          this.addEmoji(emojiIndex.findEmoji(emojiName))
        }
      },
      msgs (newVal) {
        setTimeout(() => twemoji.parse(document.getElementById('chat')), 10)
      }
    },
    methods: {
      sendChat (e) {
        if (e.keyCode === 13 && !e.shiftKey)
          e.preventDefault()
        if (this.text)
            this.$parent.sendMsg({
              room: this.$route.params.id,
              author: { name: this.username, color: this.userColor },
              content: this.text
            })
        this.text = ''
      },
      addEmoji (emoji) {
        const chatTextField = document.getElementById('chatTextField')
        const cursorIndex = chatTextField.selectionEnd
        this.text = this.text.substring(0, cursorIndex) + emoji.native + this.text.substring(cursorIndex)
        this.emojiMenu = false
        chatTextField.focus()

        twemoji.parse(chatTextField)
      },
      processEmoji (emoji) {
        if (this.inProcessEmoji) {
          const startPos = this.text.indexOf(this.inProcessEmoji[0])
          this.text = this.text.replace(this.inProcessEmoji[0], '')
          this.text = [this.text.slice(0, startPos), emoji.native, this.text.slice(startPos)].join('')

          const chatTextField = document.getElementById('chatTextField')
          chatTextField.focus()
        }
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