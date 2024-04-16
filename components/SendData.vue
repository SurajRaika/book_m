<script setup>
import { socket } from './socket';

const dataToSend = ref('Hello from the client!');

function sendDataToBackend() {
  socket.emit('SendClientRoomId', dataToSend.value);
}
</script>

<template>
  <div>
    <input v-model="dataToSend" placeholder="Enter data to send" />
    <button @click="sendDataToBackend">Send Data</button>
  </div>
</template>