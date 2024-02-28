<script setup>
useSeoMeta({
    title: "MPC | Manage Events"
})
import { useBase64 } from '@vueuse/core';
import axios from 'axios';
import { useStore } from '~/store/store';

const showAlert = ref(false)
const responseMessage = ref(null)
const currentImages = ref(null)
async function loadData(){
    try{
        showAlert.value = true
        responseMessage.value = "Fetching images..."
        let response = await axios.get('/api/task/currentWeek')
        currentImages.value = response.data.imagesLink
        showAlert.value = false
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{
                showAlert.value = false
            },1200)
        }
    }
}

const store = useStore()
const image = ref(null)
const imageBase64 = useBase64(image)
function handleInput(e){
    showAlert.value = true
    responseMessage.value = "Mengupload gambar..."
    image.value = e.target.files[0]
    setTimeout(()=>{
        responseMessage.value = "Mohon tunggu..."
        setTimeout(()=>{
            showAlert.value = false
            currentImages.value = imageBase64.base64.value
        },600)
    },1200)
}
const router = useRouter()
async function handleSubmit(){
    try{
        showAlert.value = true
        responseMessage.value = "Mengirim gambar..."
        const response = await axios.post("/api/task/currentWeek",{imagesLink: imageBase64.base64.value},{headers:{Authorization:`Bearer ${store.token}`}})
        responseMessage.value = response.data.message
        setTimeout(()=>{
                showAlert.value = false
                router.go(0)
            },1200)
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{
                showAlert.value = false
            },1600)
        }else{
            responseMessage.value = "Terjadi kesalahan..."
            setTimeout(()=>{
                showAlert.value = false
            },1600)
        }
    }
}

async function handleDelete(){
    try{
        showAlert.value = true
        responseMessage.value = "Menghapus gambar..."
        const response = await axios.delete("/api/task/currentWeek",{headers:{Authorization:`Bearer ${store.token}`}})
        responseMessage.value = response.data.message
        setTimeout(()=>{
                showAlert.value = false
                router.go(0)
            },1200)
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{
                showAlert.value = false
            },1600)
        }else{
            responseMessage.value = "Terjadi kesalahan..."
            setTimeout(()=>{
                showAlert.value = false
            },1600)
        }
    }
}

onMounted(loadData)
    
</script>

<template>
    <Transition name="fade">
            <alert v-if="showAlert" :messages="responseMessage"/>
    </Transition>
    <div class="flex justify-center mt-10 md:items-center">
        <div class="flex flex-col divide-y-2 md:flex-row border-2 border-gray-300 border-2 border-gray-300 shadow-md rounded-xl overflow-hidden md:divide-y-0 divide-x-2">
            <div class="w-[300px] h-[300px] md:h-[400px] md:w-[400px]">
                <img class="h-full object-cover" :src="currentImages">
            </div>
            <div class="relative w-[300px] flex flex-col bg-white/40 md:w-[400px] p-4 gap-8">
                <div @click="handleDelete()" class="absolute right-0 bottom-0 my-5 rounded-md mx-4 border-2 border-red-400 bg-rose-200 p-1 hover:bg-rose-300">Delete</div>
                <div class="text-xl font-semibold">Upload image</div>
                <input @input="handleInput" type='file'>
                <button class="bg-gray-200 w-[150px] p-2 hover:bg-gray-300 rounded-lg" @click="handleSubmit">Submit</button>
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