<script setup>
import { socket } from '~/components/socket';
import { onBeforeMount, onMounted } from 'vue'

const roomId = ref(null);
const count = ref(0);



onBeforeMount(() => {
  roomId.value = window.location.hash.substring(1);
  socket.emit('ScannerConnected', roomId.value)
});

onMounted(() => {
  // const roomId=window.location.hash


  const booksIsbn = [
    "9780061120084",   // To Kill a Mockingbird
    "9780590353427",   // Harry Potter and the Sorcerer's Stone
    "9780316769488",   // The Catcher in the Rye
    "9780743273565",   // The Great Gatsby
    "9780451524935",   // 1984
    "9780439023481"    // The Hunger Games
  ]
  setInterval(() => {

    socket.emit('BookData', { roomId: roomId.value, isbn: booksIsbn[count.value] });
    count.value = count.value + 1;

  }, 2000);


});

</script>

<template>sending count
  {{ count }}

</template>