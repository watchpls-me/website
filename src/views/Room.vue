<template>
    <v-container>
        <v-layout align-center row wrap>
            <v-flex xs12 class="text-sm-center">
                <video ref="video" class="text-sm-center" autoplay playsinline controls :muted="false" width="100%" height="auto"></video>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  const RTCMultiConnection = require('rtcmulticonnection')
  const connection = new RTCMultiConnection()
  import * as io from 'socket.io-client'
  window.io = io // needed due to issue within webrtc

  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'
  connection.autoCloseEntireSession = true
  connection.socketMessageEvent = 'desktopCapture'
  connection.enableLogs = true;
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
    mounted () {
      const video = this.$refs.video
      connection.onstream = function(e) {
        video.srcObject = e.stream
      }

      connection.channel = connection.sessionid = this.$route.params.id
      connection.join()
    },
    beforeDestroy () {
      connection.close()
    }
  }
</script>

<style scoped>

</style>