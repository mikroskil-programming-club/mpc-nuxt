<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const searchValue = ref('')

onMounted(async()=>{
    const response = await axios.get('/api/users')
    console.log(response.data)
})

</script>
<template>
    Members
</template>