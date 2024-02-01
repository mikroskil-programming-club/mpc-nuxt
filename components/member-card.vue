<script setup>
    import {ref} from 'vue'
    import {onClickOutside} from '@vueuse/core'
    import axios from 'axios'
    import {useStore} from '~/store/store.js'

    const props = defineProps(['nim', 'name', 'paid', 'semester', 'prodi'])

    const isModalOpen = ref(false)
    const modal = ref(null)
    const router = useRouter()
    const store = useStore()

    onClickOutside(modal, ()=>{
        isModalOpen.value = false
    })


    const showAlert = ref(false)
    const responseMessage = ref('')

    const changeStatus = async () => {
        try{
            const response = await axios.post("/api/users/status",{
                nim: props.nim,
                token: store.token
            })
            if(response.data.status == 200){
                responseMessage.value = response.data.message
                showAlert.value = true
                isModalOpen.value = false
                setTimeout(() => {
                    showAlert.value=false
                    router.go(0)
                }, 3600); 
            }
        }catch(err){
            if(err.response.data.statusCode){
                responseMessage.value = err.response.data.message
                showAlert.value=true
                isModalOpen.value = false
                setTimeout(() => {
                    showAlert.value=false
                    store.reset()
                    router.go(0)
                }, 7200);
            }
        }
        
        
    }
    
    const resetPassword = async () => {
        try{
            const response = await axios.delete('/api/users/reset',{
            data:{
                nim: props.nim,
                token: store.token
                }
            })
            if(response.data.status == 200){
                responseMessage.value = response.data.message
                showAlert.value = true
                isModalOpen.value = false
                setTimeout(() => {
                    showAlert.value=false
                    router.go(0)
                }, 3600); 
            }
        }catch(err){
            if(err.response.data.statusCode){
                responseMessage.value = err.response.data.message
                showAlert.value=true
                isModalOpen.value = false
                setTimeout(() => {
                    showAlert.value=false
                    store.reset()
                    router.go(0)
                }, 3600);
            }
        }
        
        console.log(response)
        isModalOpen.value = false
    }
</script>

<template>
    <div @click="isModalOpen = true" class="border border-solid bg-white/30 backdrop-filter-md border-gray-200 rounded-md p-4 h-auto md:w-[auto] md:max-w-[400px]">
        <div>NIM Mahasiswa     : {{ props.nim }}</div>
        <div>Nama Mahasiswa    : {{ props.name }}</div>
        <div v-if="!props.paid">Status pembayaran :
             <div class="text-red-300" >Uncompleted</div>
            </div>
        <div v-if="props.paid">Status pembayaran :
             <div class="text-green-300" >Completed</div>
            </div>
    </div>
    <Teleport to="#modal">
        <div class="root">
            <Transition name='modal'>
            <div class="modal-bg" v-if="isModalOpen">
                    <div ref='modal' class="flex flex-col w-[300px] shadow-lg rounded-lg justify-center gap-8 bg-white p-4">
                        <div>
                            <div>NIM Mahasiswa</div>
                            <div class="">{{ props.nim }}</div>
                        </div>
                        <div>
                            <div>Nama Mahasiswa</div>
                            <div>{{ props.name }}</div>
                        </div>
                        <div>
                            <div>Semester</div>
                            <div>{{ props.semester }}</div>
                        </div>
                        <div>
                            <div>Program Studi</div>
                            <div>{{ props.prodi }}</div>
                        </div>
                        <div class="flex flex-col gap-1">
                            <div>Status pembayaran</div>
                            <div class="text-green-300" v-if="props.paid">Completed</div>
                            <div class="text-red-300" v-if="!props.paid">Uncompleted</div>
                            <div class="grid grid-cols-2 gap-2">
                                <button v-if="props.paid" @click="changeStatus" class="mt-2 rounded-md p-2 bg-red-200 hover:bg-red-300">Ubah status</button>
                                <button v-if="!props.paid" @click="changeStatus" class="mt-2 rounded-md p-2 bg-green-200 hover:bg-green-300">Ubah status</button>
                                <button @click="resetPassword" class="mt-2 rounded-md p-2 bg-red-400 hover:bg-red-500">Reset password</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
    <Teleport to="#modal">
        <Transition name="fade">
            <alert v-if='showAlert' :messages="responseMessage"/>
        </Transition>
    </Teleport>
</template>
<style scoped>
.modal-bg{
    position:absolute;
    top:    0;
    left:   0;
    background-color: rgba(0,0,0,0.1);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.modal-enter-active,.modal-leave-active{
    transition: all 0.25s ease
}
.modal-enter-from, .modal-leave-to{
    opacity:0;
    transform: scale(1.1)
}

.fade-enter-active, .fade-leave-active {
        transition: ease-in-out 0.25s;
    }
.fade-enter-from, .fade-leave-to {
    transform: translateY(40px);
}
</style>