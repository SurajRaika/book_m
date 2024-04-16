<script setup>
import { socket } from '~/components/socket';
const router = useRouter()
const roomId = ref('');


socket.on("GenerateRoom", (roomId) => {
  roomId.value = roomId;
});
socket.emit("GenerateRoom");


socket.on("ChangeToEditor", (arg) => {
  router.push('/editor');
  
});



</script>

<template>
  <div>

    <a :href="'/scanner#' + roomId">{{ roomId }}scanner</a>
  </div>
</template>
