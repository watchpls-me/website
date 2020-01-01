<template>
    <v-container>
        <Chat :msgs="msgs"></Chat>
        <v-layout align-center row wrap>
            <v-flex xs12 class="text-sm-center">
                <video ref="video" class="text-sm-center" autoplay playsinline controls :muted="false" width="100%" height="auto"></video>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import Chat from '../components/Chat'
  const RTCMultiConnection = require('rtcmulticonnection')
  const connection = new RTCMultiConnection()
  import * as io from 'socket.io-client'
  window.io = io // needed due to issue within webrtc
  // connect to chat
  const socket = io.connect('http://watchpls.me:3000')

  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'
  connection.autoCloseEntireSession = true
  connection.socketMessageEvent = 'desktopCapture'
  connection.session = {
    audio: true,
    video: true,
    data: true,
    oneway: true
  }
  // www.rtcmulticonnection.org/docs/sdpConstraints/
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
  }

  export default {
    name: 'Room',
    components: {Chat},
    data: () => ({
      msgs: []
    }),
    methods: {
      sendMsg (msg) {
        socket.emit('sendchat', {room: this.$route.params.id, username: msg.username, text: msg.text})
      }
    },
    mounted () {
      const video = this.$refs.video
      connection.onstream = function(e) {
        video.srcObject = e.stream
      }

      connection.channel = connection.sessionid = this.$route.params.id
      connection.join()

      socket.on('getchat', (data) => {
        console.log("data: " + data)
        this.msgs.push(data)
      })
      socket.emit('join', this.$route.params.id)
    },
    beforeDestroy () {
      connection.close()
      socket.close()
    }
  }
</script>

<style scoped>

</style>