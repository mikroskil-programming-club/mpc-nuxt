<script setup>
import axios from 'axios'
import { useStore } from '~/store/store';

const showAlert = ref(false)
const responseMessage = ref('')
const store = useStore()
const router = useRouter()
const selection = ref('')
const datas = ref([])
const empty = ref(false)


async function loadData(){
    try{
        responseMessage.value = "Mengambil data..."
        showAlert.value = true
        const response = await axios.get('/api/material/coach',{headers:{Authorization:`Bearer ${store.token}`}})
        datas.value = response.data
        if(datas.value.length == 0){
            empty.value = true
        }
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
const currentData = ref([])
const handleFilter = async (week) => {
    try{
        if(currentFilter.value == week){
            currentFilter.value = ''
            currentData.value = null
            return
        }
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

function handleSelect(data){
    if(selection.value == data){
        selection.value = false
    }else{
        selection.value = data
    }
}

async function handleDelete(data_id){
    try{
        responseMessage.value = "Menghapus data..."
        showAlert.value = true
        const response = await axios.delete(`/api/material/coach`,{data:{_id:data_id},headers:{Authorization:`Bearer ${store.token}`}})
        responseMessage.value = response.data.message
        setTimeout(()=>{
            showAlert.value = false
            router.go(0)
        },600)
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{
                showAlert.value = false
                if(err.response.data.statusCode == 401 || err.response.data.statusCode == 400){
                    store.reset()
                    router.push('/')
                }
            },1200)
        }else{
            responseMessage.value = "Terjadi kesalahan pada client-side."
            setTimeout(()=>{
                showAlert.value = false
            },1200)
        }
        
    }
}

</script>
<template>
    <Transition name="fade">
           <alert v-if="showAlert" :messages="responseMessage"/>
   </Transition>
   <div v-if="empty" class="flex flex-col p-4 gap-10 w-full h-full justify-center items-center">
       <div class="text-3xl font-bold">404 NOT FOUND</div>
       <div class="text-center text-xl font-semibold">Rute ini sedang dalam perbaikan, dan maintenance.</div> 
   </div>
   <div v-if="datas.length > 0" class="flex justify-center items-center">
           <div class="flex flex-col mt-10 md:hidden divide-y-2 bg-white/30 rounded-xl shadow-md border-2 border-gray-200">
               <div class="flex gap-4 w-[375px] p-4  ">
                   <div v-for="data in datas" >
                       <div @click="handleFilter(data)" class="mx-auto bg-gray-100 p-2 rounded-lg cursor-pointer shadow-md hover:bg-gray-200">Week {{ data }}</div>
                   </div>
               </div>
               <div class=" flex w-[375px] gap-4 p-4" v-if="currentData">
                   <div @click="handleSelect(data)" class=" rounded-lg shadow-md p-2 cursor-pointer bg-gray-100 hover:bg-gray-200" v-for="data in currentData">
                       {{ data.title }}
                   </div>
               </div>
           
               <div v-if="selection" class="p-1 items-center flex flex-col gap-4  overflow-none">
                   <div class="mx-2 font-bold text-lg text-center">
                           {{ selection.title }}
                   </div>
                   <iframe class="rounded-xl border-2 border-gray-200 shadow-md" v-if="selection" :src="selection.pdfLink" width="360px" height="500px" frameborder="0" scrolling="no" allowfullscreen></iframe>
                   <div @click="handleDelete(selection._id)" v-if="store.isAdmin" class="font-semibold text-red-400 mx-2 cursor-pointer items-center bg-red-100 border-2 border-rose-200 px-4 rounded-md hover:bg-red-200 hover:text-red-500 mx-auto p-1 px-2">
                       Delete
                   </div>
               </div>
           </div>
       <div class="hidden md:flex">
           <div class="flex flex mt-5 w-full h-full p-2 rounded-xl shadow-md border-2 border-gray-200 bg-white/30 backdrop-filter-md justify-center gap-4">
               <div class="flex flex-col gap-3 md:w-[200px] lg:w-[300px]">
                   <div class="flex flex-col h-[300px] lg:h-[400px] gap-4 border-2 border-gray-200 p-4 rounded-xl">
                       <div v-for="data in datas">
                           <div @click="handleFilter(data)" class="mx-auto bg-gray-100 p-2 rounded-lg cursor-pointer shadow-md hover:bg-gray-200">Week {{ data }}</div>
                       </div>
                   </div>

                   <div class="h-[200px] p-2 border-2 border-gray-200 rounded-xl">
                           <div class="flex flex-col gap-3 p-2 overflow-scroll rounded-xl h-full">
                               <div @click="handleSelect(data)" class="shadow-md w-full rounded-md p-2 cursor-pointer bg-gray-100 hover:bg-gray-200" v-for="data in currentData">
                               {{ data.title }}
                           </div>
                       </div>
                   </div>
               </div>
               

               <div class="border-gray-200 overflow-none flex flex-col gap-3">
                   <div v-if="selection" class="flex shadow-md justify-between rounded-lg bg-gray-100 p-2">
                       <div class="mx-2 font-bold text-lg ">
                           {{ selection.title }}
                       </div>
                       <div @click="handleDelete(selection._id)" v-if="store.isAdmin" class="font-semibold text-red-400 mx-2 cursor-pointer items-center bg-red-100 border-2 border-rose-200 px-4 rounded-md hover:bg-red-200 hover:text-red-500">
                           Delete
                       </div>
                   </div>
                   <iframe class="rounded-lg md:w-[400px] md:h-[450px] lg:w-[600px] lg:h-[550px]" :src="selection.pdfLink" frameborder="0" scrolling="no" allowfullscreen></iframe>
               </div>
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
    
    ::-webkit-scrollbar{
        display: none;
    }
</style>