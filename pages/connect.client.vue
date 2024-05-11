<script setup>
import { socket } from '~/components/socket';
const router = useRouter()
const roomId = ref('');

// socket.on('connect', function () {
//   socket.emit("GenerateRoom");
// });

socket.on("GenerateRoom", (roomId_data) => {
  console.log("HEEEE",roomId_data);
  roomId.value = roomId_data;
});


socket.on("ChangeToEditor", (arg) => {
  router.push('/editor');
  
});



</script>

<template>
  <div>

    <a :href="'/scanner#' + roomId">{{ roomId }}scanner</a>
  </div>
</template>
