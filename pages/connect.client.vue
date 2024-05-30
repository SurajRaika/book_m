<script setup>
import { socket } from "~/components/socket";
import VueQrcode from "vue-qrcode";
import { computed, onBeforeMount } from "vue";
const router = useRouter();
const roomId = ref("");

onBeforeMount(() => {
  socket.on("GenerateRoom", (roomId_data) => {
    roomId.value = roomId_data;
  });
});

socket.on("ChangeToEditor", (arg) => {
  router.push("/editor");
});

const WebsiteUrl = computed(() => {
  const currentUrl = window.location.href;
  return currentUrl + "/scanner#" + roomId.value;
});
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <a target="_blank" :href="'/scanner#' + roomId">
      <vue-qrcode width="300" :value="WebsiteUrl" />
    </a>
  </div>
</template>
