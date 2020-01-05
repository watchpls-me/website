<template>
    <div v-resize="onResize">
        <Chat :username="username" :msgs="msgs"></Chat>
        <v-flex xs12 class="text-sm-center video-container">
            <!-- <v-card v-show="f" xs12 class="text-sim-center video-container" height="100%" width="100%"><v-img height="100%" src="@/assets/space.jpg"></v-img></v-card> -->
            <!-- <v-overlay v-show="!show" absolute color="black" opacity="1" :key="show"></v-overlay> -->
            <video
                    ref="video"
                    class="text-sm-center"
                    autoplay
                    playsinline
                    controls
                    :muted="false"
                    width="100%"
                    :height="windowSize.y-48"
                    poster="black"
            />
        </v-flex>
    </div>
</template>

<script>
  import Chat from './Chat'

  const RTCMultiConnection = require('rtcmulticonnection')
  const connection = new RTCMultiConnection()
  import * as io from 'socket.io-client'

  window.io = io // needed due to issue within webrtc
  // connect to chat
  const socket = io.connect('https://chat.watchpls.me/')

  connection.socketURL = 'https://rtc.watchpls.me/'
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
    name: 'RoomView',
    components: { Chat },
    data: () => ({
      msgs: [],
      windowSize: {
        x: 0,
        y: 0,
      },
    }),
    props: {
      username: {
        value: String,
        default: '',
      }
    },
    methods: {
      sendMsg (msg) {
        socket.emit('sendchat', { room: this.$route.params.id, username: msg.username, text: msg.text })
      },
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
    },
    mounted () {
      // get window size
      this.onResize()

      const video = this.$refs.video
      connection.onstream = function (e) {
        if (!video.srcObject)
          video.srcObject = e.stream
      }

      connection.channel = connection.sessionid = this.$route.params.id
      connection.join()

      socket.on('getchat', (data) => {
        // console.log('data: ' + data)
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

<style>
    .video-container {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: black;
    }

    html {
        overflow-y: auto;
    }

    .box {
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    #bot {
        flex: 1 1 auto;
        background: white;
    }

    video::-webkit-media-controls-play-button:hover {
        /* -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
        filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70); */
        opacity: 0.7;
    }

    /* video::-webkit-media-controls-fullscreen-button {
      ;
    } */

    video::-webkit-media-controls-fullscreen-button:hover {
        opacity: 0.7;
    }
</style>