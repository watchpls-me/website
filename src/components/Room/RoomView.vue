<template>
    <div v-resize="onResize">
        <Chat :username="username" :msgs="msgs"></Chat>
        <v-flex xs12 class="text-sm-center video-container">
            <!-- <v-card v-show="f" xs12 class="text-sim-center video-container" height="100%" width="100%"><v-img height="100%" src="@/assets/space.jpg"></v-img></v-card> -->
            <!-- <v-overlay v-show="!show" absolute color="black" opacity="1" :key="show"></v-overlay> -->
            <video
                    ref="video"
                    playsinline
                    class="text-sm-center"
                    controls
                    width="100%"
                    :height="windowSize.y-48"
                    poster="black"
                    @pause="pausePressed"
                    @play="playPressed"
                    @volumechange="volumeChanged"
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

  connection.iceServers = [
    {
      urls: [
        'stun:watchpls.me:3478',
        'stun:watchpls.me:5349',
      ]
    },
    {
      urls: [
        'turn:watchpls.me:3478',
        'turn:watchpls.me:5349',
      ],
      username: 'watchpls',
      credential: 'pantspooping'
    }
  ]

  connection.enableLogs = false

  export default {
    name: 'RoomView',
    components: { Chat },
    data: () => ({
      msgs: [],
      windowSize: {
        x: 0,
        y: 0,
      },
      stream: false, // Holds the MediaStream object
      lastStateMuted: false,
    }),
    props: {
      username: {
        value: String,
        default: '',
      },
    },
    methods: {
      sendMsg (msg) {
        socket.emit('sendchat', msg)
      },
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
      pausePressed () {
        this.stream.mute()
      },
      playPressed () {
        let video = this.$refs.video

        // Set src object only if not set
        if (!video.srcObject) {
          video.srcObject = this.stream
        }

        setTimeout(() => {
          this.stream.unmute()

          let playPromise = video.play()

          if (playPromise !== undefined) {
            playPromise.then(_ => {
              // Automatic playback started!
              // Show playing UI.
            }).catch(error => {
              // Auto-play was prevented
              // Show paused UI.
            })
          }
        }, 100)
      },
      volumeChanged() {
        let video = this.$refs.video
        let volume = video.volume
        let muted = video.muted
        if(muted){
          this.stream.mute("audio")
          this.lastStateMuted = true
        }else{
          // Prevent multiple fires of this
          // when user changes the volume
          if(this.lastStateMuted){
            this.lastStateMuted = false
            this.stream.unmute()
          }
        }
      }
    },
    mounted () {
      // get window size
      this.onResize()

      connection.onstream = (e) => {
        console.log(e.stream)

        if (!this.stream) {
          this.stream = e.stream
          this.stream.mute("audio")
          this.playPressed()

          // Save peoples ears upon entering the stream just in case
          this.$refs.video.volume = 0.3
        }
      }

      connection.onclose = (e) => {
        // TODO: Use to display message to user if host dc's
        this.pausePressed()
        this.stream = false
        this.$refs.video.srcObject = ''
      }

      connection.channel = connection.sessionid = this.$route.params.id
      connection.join()

      socket.on('getchat', (data) => {
        // console.log('data: ' + data)
        this.msgs.push(data)
      })
      socket.emit('join', this.$route.params.id)
    }
    ,
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

    video::-webkit-media-controls-fullscreen-button:hover,
    video::-webkit-media-controls-mute-button:hover,
    video::-webkit-media-controls-play-button:hover {
        opacity: 0.7;
    }

    video::-webkit-media-controls-current-time-display,
    video::-webkit-media-controls-timeline,
    video::-webkit-media-controls-timeline-container {
        display: none !important;
    }
</style>