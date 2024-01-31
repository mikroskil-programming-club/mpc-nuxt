<script setup>
    import {ref} from 'vue'
    import {onClickOutside} from '@vueuse/core'
    import axios from 'axios'
    import {useStore} from '~/store/store.js'

    const props = defineProps(['nim', 'name', 'paid', 'semester', 'prodi'])
    console.log(props.prodi)

    const isModalOpen = ref(false)
    const modal = ref(null)
    const router = useRouter()
    const store = useStore()
    onClickOutside(modal, ()=>{
        isModalOpen.value = false
    })

    const changeStatus = async () => {
        const response = await axios.post("/api/users/status",{
            nim: props.nim,
            token: store.token
        })
        console.log(response)
        router.go(0)
    }
</script>

<template>
    <div @click="isModalOpen = true" class="border border-solid bg-white/30 backdrop-filter-md border-gray-200 rounded-md p-4 h-[150px] md:max-w-[400px]">
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
            <div class="modal-bg " v-if="isModalOpen">
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
                        <button @click="changeStatus" class="mt-2 rounded-md p-2 bg-gray-200 hover:bg-gray-300">Ubah status</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </Teleport>
</template>
<style scoped>
.modal-bg{
    position:absolute;
    top:    0;
    left:   0;
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>