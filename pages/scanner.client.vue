<script setup>
import { io } from "socket.io-client";
import { onBeforeMount, onMounted } from 'vue'

const roomId = window.location.hash.substring(1);
const count = ref(0);
const socket = io({
  query: {
    roomId: roomId
  }
});

onBeforeMount(() => {
  socket.emit('ScannerConnected', roomId)
});

onMounted(() => {
  const booksIsbn = [
    "9780061120084",   // To Kill a Mockingbird
    "9780590353427",   // Harry Potter and the Sorcerer's Stone
    "9780316769488",   // The Catcher in the Rye
    "9780743273565",   // The Great Gatsby
    "9780451524935",   // 1984
    "9780439023481"    // The Hunger Games
  ]
  setInterval(() => {
    socket.emit('BookData', { roomId: roomId, isbn: booksIsbn[count.value] });
    count.value = count.value + 1;
  }, 2000);

  socket.on("disconnectedEditor", () => {
    window.close(); // Close the website when disconnected
  });
});
</script>

<template>sending count
  {{ count }}
</template>
