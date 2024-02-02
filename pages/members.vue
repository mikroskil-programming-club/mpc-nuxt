<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const searchValue = ref('')
import {useStore} from '~/store/store.js'
import memberCard from '~/components/member-card.vue';
import alert from '~/components/alert.vue';
import { onClickOutside } from '@vueuse/core';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
const filter = [
  { name: 'Paid' },
  { name: 'Unpaid'},
  { name: 'Registered'},
  { name: 'Not Registered'},
]

const datas = ref([])
const stats = ref({})
const store = useStore()
const responseMessage = ref('')
const showAlert = ref(false)
const router = useRouter()
const filterRef = ref('Filter')
const loadData = async()=>{
    try{
        responseMessage.value = "Mengambil data..."
        showAlert.value = true
        let response = await axios.get('/api/users',{headers:{Authorization:`Bearer ${store.token}`}})
        datas.value = response.data
        response = await axios.get('/api/users/stats')
        stats.value = response.data
        filterRef.value = "Filter"
        showAlert.value = false
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            showAlert.value=true
            setTimeout(() => {
                showAlert.value=false
                store.reset()
                router.push('/login')
            }, 1200);
        }
    }
}

onMounted(loadData)


const handleSearch = async (e)=>{
    searchValue.value = e.target.value
    let response = await axios.post('/api/users/find',{data:searchValue.value})
    datas.value = response.data
}



const handleFilter = async (close, e) => {
    responseMessage.value = "Mengambil data..."
    showAlert.value = true
    const filter = e.target.textContent
    filterRef.value = filter
    close()
    if(filter == "Paid") {
        const response = await axios.post('/api/users/find/stats',{data:true})
        datas.value = response.data
    }else if(filter == "Unpaid"){
        const response = await axios.post('/api/users/find/stats',{data:false})
        datas.value = response.data
    }else if(filter == "Registered"){
        const response = await axios.post('/api/users/find/status',{data:true})
        datas.value = response.data
    }else{
        const response = await axios.post('/api/users/find/status',{data:false})
        datas.value = response.data
    }
    showAlert.value = false
}

const isModalOpen = ref(false)
const modal = ref(null)
const currentData = ref({})
onClickOutside(modal,()=>{
    isModalOpen.value = false
    currentData.value = {}
})
async function handleSubmit(){
    try{
        const response = await axios.post('api/users/add',currentData.value,{headers:{Authorization:`Bearer ${store.token}`}})
        responseMessage.value = response.data.message
        showAlert.value = true
        setTimeout(()=>{
            showAlert.value = false
            router.go(0)
        },3600)
    }catch(err){
        console.log(err)
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.statusMessage
            showAlert.value = true
            console.log(err.response.data.statusCode)
            setTimeout(()=>{
                showAlert.value = false
                
                if(err.response.data.statusCode != 404) router.go(0)
            },3600)
        }
    }
    
}
</script>
<template>
    <div id="modal">
        <Transition name="modal">
            <div v-if="isModalOpen" class="z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black/30">
                <div ref='modal' class="flex flex-col h-[400px] gap-4 p-4 bg-white w-[300px] md:w-[400px] rounded-lg shadow-lg ">
                    <div class="font-semibold text-center">Tambah user</div>
                    <div class="flex flex-col h-full overflow-scroll p-2">
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">NIM</div>
                            <input @change="e => currentData.nim = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">Email</div>
                            <input @change="e => currentData.email = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">Nama lengkap</div>
                            <input @change="e => currentData.fullName = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">Nama panggilan</div>
                            <input @change="e => currentData.firstName = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">Program studi</div>
                            <input @change="e => currentData.prodi = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">Semester</div>
                            <input @change="e => currentData.semester = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold">Kelas</div>
                            <input @change="e => currentData.kelas = e.target.value" class="border outline-none p-1 px-2 rounded-md shadow-sm">
                        </div>
                    </div>
                    
                    
                    <button @click="handleSubmit" class="mx-auto bg-gray-200 w-[150px] p-2 rounded-md shadow-md hover:bg-gray-300">Submit</button>
                </div>
            </div>
        </Transition>
        <Transition name="fade">
            <alert v-if="showAlert" :messages="responseMessage"/>
        </Transition>
    </div>
    <div class="flex flex-col gap-8 md:gap-6 mx-auto items-center">
        <div class="flex flex-col mt-4 items-center gap-2 md:gap-7 lg:gap-10 md:flex-row">
            <div class="flex items-center gap-2 lg:gap-5">
                
                <input @change='handleSearch' placeholder="NIM atau Nama" class="p-2 my-4 w-[300px] lg:w-[450px] text-center rounded-lg outline-none shadow-lg">
            </div>
            <div class="grid grid-cols-2 w-full gap-2 lg:gap-5">
                <button v-if="store.isAdmin" @click="isModalOpen = true" class="bg-blue-200 p-2 px-6 rounded-lg h-full shadow-md hover:bg-blue-300">Tambah user</button>
                <Popover class="relative z-0">
                    <PopoverButton class="z-0 flex w-full justify-center gap-3 bg-blue-200 ml-4 p-2 rounded-lg h-full shadow-md hover:bg-blue-300">
                        <div>{{ filterRef }}</div>
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                    
                    </PopoverButton>

                    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                    <PopoverPanel v-slot="{ close }" class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                        <div class="w-screen max-w-[200px] flex-auto overflow-hidden rounded-3xl bg-white/50 backdrop-blur-lg text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            <div class="p-4">
                                <div @click="handleFilter(close,$event)" v-for="item in filter" :key="item.name" class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-200/70">
                                        {{ item.name }}
                                </div>
                            </div>
                                <div class="flex items-center justify-center bg-gray-50">
                                    <div class="p-2">Clear filters</div>
                                </div>
                        </div>
                    </PopoverPanel>
                    </transition>
                </Popover>
                <!-- <button @click="handlePaid" class="bg-green-200 p-2 rounded-lg " v-if="stats.paid">Paid : {{ stats.paid }}</button>
                <button @click="handleUnPaid" class="bg-red-200 p-2 rounded-lg" v-if="stats.unpaid">Unpaid : {{ stats.unpaid }}</button>
                <button @click="loadData" class="bg-gray-200 p-2 rounded-lg" v-if="stats.total">Total : {{ stats.total }}</button> -->
            </div>
            
        </div>
        
        <div class="flex items-center justify-center">
            <div class="flex bg-gray-200/30 border border-solid border-gray md:border-none md:bg-transparent rounded-md w-[350px] flex-col gap-8 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-6 md:w-[auto] max-h-[70vh] overflow-scroll p-4">
            <memberCard v-for="data in datas" :nim='data.NIM' :name='data.fullName' :paid='data.paid' :semester="data.semester" :prodi="data.prodi" :password="Boolean(data.password)"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    div::-webkit-scrollbar{
        display: none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: ease-in-out 0.25s;
    }
    .fade-enter-from, .fade-leave-to {
        transform: translateY(40px);
    }
    
    .modal-enter-active, .modal-leave-active{
        transition: all 0.25s;
    }
    .modal-enter-from, .modal-leave-to {
        opacity:0;
        transform: scale(1.1);
    }
    
</style>