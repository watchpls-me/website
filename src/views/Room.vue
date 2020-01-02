<template>
    <div>
        <EnterRoom v-if="!username" v-model="username"></EnterRoom>
        <RoomView v-else :username="username"></RoomView>
    </div>
</template>

<script>
  import EnterRoom from '../components/Room/EnterRoom'
  import RoomView from '../components/Room/RoomView'
  export default {
    name: 'Room',
    components: {RoomView, EnterRoom},
    data: () => ({
      username: '', // temp solution
    }),
  }
</script>

<style scoped>

</style>