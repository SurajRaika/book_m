<script setup>
import { socket } from '~/components/socket';
const router = useRouter()
const link = ref([]);
const count=ref(0);

socket.on("BookData", (arg) => {
  link.value.push(arg);
  count.value=count.value +1;
});



</script>

<template>
  <div>
{{ count }}
    <!-- <a :href="'/scanner#' + link">{{ link }}scanner</a> -->
    <span v-for="l in link" >{{ l }}</span>
  </div>
</template>
