<script setup>
import { socket } from '~/components/socket';
// import { editorDas } from '~/components/socket';
import BookCard from '~/components/BookCard.vue'

const booksCode = ref([]);

socket.on("BookData", (arg) => {
  booksCode.value.push(parseInt(arg));
});



</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Connection Speed Bar -->
    <div class="bg-green-500 w-full h-2"></div>
<h1 class="  text-5xl   font-mono font-bold text-center mt-4 " ></h1>
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-6 mb-3 ">
  Books / Dashboard  </h1>
    <!-- Index Container -->
    <div class="p-4">
      <div class=" flex flex-col   md:flex-row  flex-wrap justify-around   gap-4 ">
        <!-- Example Book Cards -->

        <BookCard :isbn="num" v-for=" num in booksCode " />
      </div>
    </div>
  </div>
</template>
