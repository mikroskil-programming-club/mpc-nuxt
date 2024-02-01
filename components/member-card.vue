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

    const paid = ref(props.paid)

    onClickOutside(modal, ()=>{
        isModalOpen.value = false
    })

    const changeStatus = async () => {
        const response = await axios.post("/api/users/status",{
            nim: props.nim,
            token: store.token
        })
        if(response.data.status == 400 || response.data.status == 401){
            store.reset()
            router.push("/login")
        }
        isModalOpen.value = false
        paid.value = !Boolean(paid.value)
    }
</script>

<template>
    <div @click="isModalOpen = true" class="border border-solid bg-white/30 backdrop-filter-md border-gray-200 rounded-md p-4 h-auto md:w-[auto] md:max-w-[400px]">
        <div>NIM Mahasiswa     : {{ props.nim }}</div>
        <div>Nama Mahasiswa    : {{ props.name }}</div>
        <div v-if="!paid">Status pembayaran :
             <div class="text-red-300" >Uncompleted</div>
            </div>
        <div v-if="paid">Status pembayaran :
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
                            <div class="text-green-300" v-if="paid">Completed</div>
                            <div class="text-red-300" v-if="!paid">Uncompleted</div>
                            <button @click="changeStatus" class="mt-2 rounded-md p-2 bg-gray-200 hover:bg-gray-300">Ubah status</button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
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
</style>