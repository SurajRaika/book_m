<script setup>
import { io } from "socket.io-client";
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const roomId = window.location.hash.substring(1);
const socket = io({
  query: {
    roomId: roomId,
  },
});
const result = ref("");

const selectedDevice = ref(null);
const devices = ref([]);
const trackFunctionOptions = [
  { text: "centered text", value: paintCenterText },
];

const trackFunctionSelected = ref(trackFunctionOptions[0]);

const barcodeFormats = ref({
  ean_13: true,
  ean_8: true,
  upc_a: true,
});

const error = ref("");



const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format]
  );
});

onBeforeMount(() => {
  socket.emit("ScannerConnected", roomId);
});

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === "videoinput"
  );

  if (devices.value.length > 0) {
    const empty_device = { deviceId: null, label: "No Camera" };
    selectedDevice.value =
      devices.value.find((device) => device.label.includes("back")) ||
      devices.value[0] ||
      empty_device;
  }
  socket.on("disconnectedEditor", () => {
    window.close(); // Close the website when disconnected
  });
  !roomId && window.close();
});

function onDetect(detectedCodes) {
  socket.emit("BookData", { roomId: roomId, isbn: detectedCodes });

  console.log(detectedCodes);
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
}

function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#35495e";
    ctx.strokeText(detectedCode.rawValue, centerX, centerY);

    ctx.fillStyle = "#5cb984";
    ctx.fillText(rawValue, centerX, centerY);
  }
}

function onError(err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
}
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 w-full flex justify-center items-center m-2 z-30">
      <span class="backdrop-blur-sm bg-[#ffffff07] rounded-sm w-10/12">
        <Select v-model="selectedDevice">
          <SelectTrigger>
            <SelectValue placeholder="Select Camera">
              <span v-if="selectedDevice">{{ selectedDevice.label }}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <!-- <SelectLabel>Fruits</SelectLabel> -->
              <SelectItem v-for="device in devices" :key="device.label" :value="device" v-if="devices.length !== 0">
                {{ device.label }}
              </SelectItem>
              <SelectItem v-else> No Camera </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
    </div>

    <!-- 
    <div class="    fixed bottom-0 left-0 decode-result  z-30 bg-white ">

      <p>
        Last result: <b>{{ result }}</b>
      </p>
    
    </div> -->
    <div class="relative w-screen h-screen">
      <qrcode-stream :constraints="{ deviceId: selectedDevice.deviceId }" :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats" @error="onError" @detect="onDetect" v-if="selectedDevice !== null" />
      <p v-else class="error">No cameras on this device</p>
    </div>

    <div class="fixed bottom-0 left-0 w-full flex justify-center items-center m-2 z-30">
      <span v-if="error" class="backdrop-blur-sm bg-[#ffffff07] rounded-sm w-10/12">
        <Alert variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription> {{ error }} </AlertDescription>
        </Alert>
      </span>
    </div>
  </div>
</template>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}

.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
}
</style>
