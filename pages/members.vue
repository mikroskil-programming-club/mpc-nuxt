<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const searchValue = ref('')
import memberCard from '~/components/member-card.vue';

const datas = ref([])
const stats = ref({})

const loadData = async()=>{
    let response = await axios.get('/api/users')
    datas.value = response.data
    response = await axios.get('/api/users/stats')
    stats.value = response.data
    console.log(datas,stats)
}

onMounted(loadData)

const handleSearch = async (e)=>{
    searchValue.value = e.target.value
    let response = await axios.post('/api/users/find',{data:searchValue.value})
    datas.value = response.data
}

const handlePaid = async (e)=>{
    searchValue.value = e.target.value
    let response = await axios.post('/api/users/find/stats',{data:true})
    datas.value = response.data
}

const handleUnPaid = async (e)=>{
    searchValue.value = e.target.value
    let response = await axios.post('/api/users/find/stats',{data:false})
    datas.value = response.data
}

</script>
<template>
    <div id="modal"></div>
    <div class="flex flex-col gap-2 md:gap-8 mx-auto items-center">
        <div class="flex flex-col items-center gap-1 md:gap-4 justify-center md:flex-row">
            
            <input @change='handleSearch' placeholder="NIM atau Nama" class="p-2 my-4 w-[200px] md:w-[275px] lg:w-[400px] text-center rounded-lg outline-none shadow-lg">
            <div class="flex gap-5">
                <div @click="handlePaid" class="bg-green-200 p-2 rounded-lg">Paid   : {{ stats.paid }}</div>
                <div @click="handleUnPaid" class="bg-red-200 p-2 rounded-lg">Unpaid : {{ stats.unpaid }}</div>
                <div @click="loadData" class="bg-gray-200 p-2 rounded-lg">Total : {{ stats.total }}</div>
            </div>
            
        </div>
        
        <div class="flex items-center justify-center">
            <div class="flex max-w-[75%] flex-col gap-8 md:grid md:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 max-h-[75vh] overflow-scroll p-4">
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