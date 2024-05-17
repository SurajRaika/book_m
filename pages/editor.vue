<script setup>
import { socket } from '~/components/socket';
const booksCode = ref([]);

socket.on("BookData", (arg) => {
  booksCode.value.push(parseInt(arg));
});



</script>

<template>
  <div>sddd
    <span v-for="l in booksCode" >{{ l }}</span>
  </div>
</template>

