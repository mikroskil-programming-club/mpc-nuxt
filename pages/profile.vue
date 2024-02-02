<script setup>
import { onClickOutside } from '@vueuse/core';
import axios from 'axios'
import { useStore } from '~/store/store'


const store = useStore()
const router = useRouter()

const showAlert = ref(false)
const responseMessage = ref('')
const data = ref({})
const isModalOpen = ref(false)
const modal = ref(null)
onMounted(async ()=>{
    try{
        showAlert.value = true
        responseMessage.value = "Loading..."
        const response = await axios.get('/api/users/find/profile',{headers: {Authorization:`Bearer ${store.token}`}})
        data.value = response.data
        showAlert.value = false
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(() => {
                showAlert.value=false
                store.reset()
                router.push('/login')
            }, 1200);
        }
    }
    
})

const logoutHandle = () => {
    responseMessage.value = "Berhasil logout"
    showAlert.value = true
    setTimeout(() => {
        showAlert.value = false
        store.reset()
        router.push('/')
    }, 1200)
}

const cancelModal = ()=>{
    isModalOpen.value = false
    selection.value = null
}

onClickOutside(modal,cancelModal)

const selection = ref(null)
</script>

<template>
    <Transition name="fade">
        <alert v-if='showAlert' :messages="responseMessage"/>
    </Transition>
    <Transition name="modal">
    <div v-if='isModalOpen' class="z-50 fixed w-full h-full flex top-0 left-0 justify-center items-center bg-black/50">
            <div ref="modal" class="rounded-lg w-[350px] md:w-[450px] h-[450px] flex flex-col p-4 bg-white r">
                <div v-if="!selection" class="flex flex-col gap-4 h-full justify-center items-center">
                    <div class="font-semibold my-4">Apa yang ingin diubah?</div>
                    <div class="grid gap-6 w-full">
                        <div @click="selection = 'nama'" class="flex rounded-md shadow-md items-center justify-center text-center bg-gray-200 p-2 hover:bg-gray-300">Nama</div>
                        <div @click="selection = 'perkuliahan'" class="flex rounded-md shadow-md items-center justify-center text-center bg-gray-200 p-2 hover:bg-gray-300">Perkuliahan</div>
                        <div @click="selection = 'pw'" class="flex rounded-md shadow-md items-center justify-center text-center bg-gray-200 p-2 hover:bg-gray-300">Password</div>
                    </div>
                </div>
                <div v-if="selection == 'nama'" class="flex flex-col h-full items-center" >
                    <div class="text-center text-lg font-bold p-4 border-b-2 w-full border-solid border-gray-200">Ubah nama</div>
                    <div class="flex flex-col h-full border-b-1 border-solid border-gray-200 w-full p-4 gap-8">
                        <div>
                            <div class="text-center font-semibold my-4">Nama pendek</div>
                            <input class="w-full outline-none border-b-[1px] p-2"/>
                        </div>
                        <div>
                            <div class="text-center font-semibold my-4">Nama panjang</div>
                            <input class="w-full outline-none border-b-[1px] p-2"/>
                        </div>
                        <div class="grid grid-cols-2">
                            <button class="mx-auto bg-gray-200 rounded-lg w-[125px] p-2 hover:bg-gray-300 shadow-md">Submit</button>
                            <button @click="cancelModal" class="mx-auto bg-red-200 rounded-lg w-[125px] p-2 hover:bg-red-300 shadow-md">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    
    
    <div class="flex flex-col bg-white/30 mx-auto my-20 max-w-[350px] md:max-w-[400px] border border-solid border-gray-300 rounded-lg divide-y divide-dashed divide-gray-200 gap-4 p-5 shadow-md">
        <div class="flex flex-col items-center p-4 font-semibold text-2xl gap-2">
            <div>{{ data.fullName }}</div>
        </div>
        <div class="grid grid-cols-2 gap-5 font-semibold text-lg text-center">
            <div class="flex justify-center items-center">NIM</div>
            <div class="flex justify-center items-center">{{ data.NIM }}</div>
        </div>
        <div class="grid grid-cols-2 gap-5 font-semibold text-lg text-center">
            <div class="flex justify-center items-center">Program Studi</div>
            <div class="flex justify-center items-center">{{ data.prodi }}</div>
        </div>
        <div class="grid grid-cols-2 gap-5 font-semibold text-lg text-center">
            <div class="flex justify-center items-center">Kelas</div>
            <div class="flex justify-center items-center">{{ data.kelas }}</div>
        </div>
        <div class="grid grid-cols-2 gap-5 font-semibold text-lg text-center">
            <div class="flex justify-center items-center">Semester</div>
            <div class="flex justify-center items-center">{{ data.semester }}</div>
        </div>
        <div class="flex flex-col items-center font-semibold text-lg p-4">
            <div>Status pembayaran</div>
            <div v-if="data.paid" class="py-4 font-bold text-green-400">Sudah dibayar</div>
            <div v-if="!data.paid" class="text-red-200">Belum dibayar</div>
            <div class="flex flex-col md:grid md:grid-cols-2 gap-3">
                <button @click="isModalOpen = true" class="font-normal border border-solid mt-4 p-2 text-md w-[150px] rounded-lg bg-gray-200 hover:bg-gray-300 px-5">Edit profile</button>
                <button @click="logoutHandle" class="hidden md:inline font-normal border border-solid mt-4 p-2 text-md w-[150px] rounded-lg bg-red-300 hover:bg-red-400 px-5">Logout</button>
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

    .modal-enter-active, .modal-leave-active{
        transition: all 0.25s;
    }
    .modal-enter-from, .modal-leave-to {
        opacity:0;
        transform: scale(1.1);
    }
</style>