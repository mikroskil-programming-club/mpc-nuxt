<script setup>
import axios from 'axios'
import { useStore } from '~/store/store';

const showAlert = ref(false)
const responseMessage = ref('')
const store = useStore()
const router = useRouter()
const selection = ref('')
const datas = ref([])

async function loadData(){
    try{
        responseMessage.value = "Mengambil data..."
        showAlert.value = true
        const response = await axios.get('/api/material/coach',{headers:{Authorization:`Bearer ${store.token}`}})
        datas.value = response.data
        setTimeout(()=>{
            showAlert.value = false
        },600)

    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{
                showAlert.value = false
                store.reset()
                router.push('/')     
        },1200)

        }
    }
}



onMounted(loadData)

const currentFilter = ref('')
const currentData = ref(null)
const handleFilter = async (week) => {
    try{
        responseMessage.value = "Mendapatkan data..."
        showAlert.value = true
        currentFilter.value = week
        const response = await axios.get(`/api/material/coach/${week}`,{headers:{Authorization:`Bearer ${store.token}`}})
        currentData.value = response.data
        setTimeout(()=>{
            showAlert.value = false
        },600)
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{
                showAlert.value = false
                store.reset()
                router.push('/')
            },1200)
        }
    }
    
}


</script>
<template>
     <Transition name="fade">
            <alert v-if="showAlert" :messages="responseMessage"/>
    </Transition>
    <div class="flex justify-center items-center">

        <div class="flex flex-col mt-10 gap-10 max-w-[800px] w-full h-full justify-center items-center">
            <div class="flex gap-4 min-w-[400px] max-w-[800px] shadow-md border-2 border-gray-200 p-4 rounded-xl bg-white/30">
                <div v-for="data in datas">
                    <div @click="handleFilter(data.week)" class="mx-auto bg-gray-200 p-2 rounded-lg cursor-pointer shadow-md hover:bg-gray-300">Week {{ data.week }}</div>
                </div>
            </div>

            <div class=" flex min-w-[400px] max-w-[800px] bg-white/30 p-4 border-2 border-gray-200 rounded-xl shadow-md" v-if="currentData">
                <div @click="selection = data" class=" rounded-lg shadow-md p-2 cursor-pointer bg-gray-200 hover:bg-gray-300" v-for="data in currentData">
                    {{ data.title }}
                </div>
            </div>

            <div class="border-gray-200">
                <iframe v-if="selection" :src="selection.pdfLink" width="400px" height="400px" frameborder="0" scrolling="no" allowfullscreen></iframe>
            </div>
        </div>


    </div>
</template>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: ease-in-out 0.25s;
    }
    .fade-enter-from, .fade-leave-to {
        transform: translateY(40px);
    }
    
</style>