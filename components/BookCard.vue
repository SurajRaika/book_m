<template>
  <Card class=" w-80      card  ">
    <CardHeader class="   ">
      <CardTitle> <span v-if="!book.title" >  {{props.isbn}} <br><br></span> {{ book.title || 'Loading...' }}</CardTitle>
      <CardDescription>{{ book.author }}</CardDescription>
    </CardHeader>

    <CardContent>
      <img :src="book.imageSrc" alt="Book Cover" class="   w-64   h-auto" v-if="book.imageSrc">
      <p v-if="book.publisher">Publisher: {{ book.publisher }}</p>
      <p v-if="book.published">Published: {{ book.published }}</p>
    </CardContent>
   
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const props = defineProps<{ isbn: string }>()

const book = ref({
  title: '',
  author: '',
  imageSrc: ''
})

const fetchBookData = async () => {
  try {
    const response = await $fetch(`/api/FindBook?isbn=${props.isbn}`)
    if (response.error) {
      throw new Error(response.error)
    }
    book.value = response
  } catch (error) {
    console.error('Error fetching book data:', error)
  }
}

onMounted(fetchBookData)
watch(() => props.isbn, fetchBookData)
</script>

<style scoped>
/* You can add additional styles here if needed */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.card {
  /* Initial styles for the card */
  opacity: 0; /* Ensure the card starts off invisible */
  animation: fadeIn 1s forwards; /* Apply the fadeIn animation */
}

</style>
