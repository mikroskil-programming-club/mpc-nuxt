<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const searchValue = ref('')
import memberCard from '~/components/member-card.vue';

const datas = ref([])

onMounted(async()=>{
    const response = await axios.get('/api/users')
    datas.value = response.data
})

const handleSearch = async (e)=>{
    searchValue.value = e.target.value
    const response = await axios.post('/api/users/find',{data:searchValue.value})
    datas.value = response.data
}

</script>
<template>
    <div id="modal"></div>
    <div class="flex flex-col gap-8 items-center max-w-full">
        <input @change='handleSearch' placeholder="Pencarian menggunakan NIM atau Nama" class="p-2 my-4 w-[350px] md:w-[500px] text-center rounded-lg outline-none shadow-lg">
        <div class="flex w-full items-center justify-center">
            <div class="flex max-w-[75%] flex-col md:grid md:grid-cols-3 gap-4 max-h-[75vh] overflow-scroll p-4">
            <memberCard v-for="data in datas" :nim='data.NIM' :name='data.fullName' :paid='data.paid' :semester="data.semester" :prodi="data.prodi"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    div::-webkit-scrollbar{
        display: none;
    }
</style>