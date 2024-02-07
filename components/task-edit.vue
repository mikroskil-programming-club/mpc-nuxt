<script setup>
import axios from 'axios';
import { routerKey } from 'vue-router';
import { useStore } from '~/store/store';


const props = defineProps(['task_id','task_name','task_status'])

const onEdit = ref(false)

const store = useStore()
const currentWeek = ref(props.task_id)
const currentName = ref(props.task_name)
const currentStatus = ref(props.task_status)
const responseMessage = ref('')
const showAlert = ref(false)
const router = useRouter()

function cancelEdit(){
    currentWeek.value = props.task_id
    currentName.value = props.task_name
    currentStatus.value = props.task_status
    onEdit.value = false
}

async function submitEdit(){
    try{
        responseMessage.value = "Mengubah data..."
        showAlert.value = true
        const response = await axios.post('/api/task/edit',{
            no: props.task_id,
            new_no: currentWeek.value,
            task: currentName.value,
            status: currentStatus.value
        },{headers:{Authorization:`Bearer ${store.token}`}})
        responseMessage.value = response.data.message
        setTimeout(() => {
            showAlert.value = false
            router.go(0)
        }, 600);
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(() => {
                showAlert.value = false
                if(err.response.data.statusCode != 405){
                    store.reset()
                    router.go(0)
                }
            }, 1200);
        }
    }
}

</script>

<template>
    <Transition name="fade">
            <alert v-if="showAlert" :messages="responseMessage"/>
    </Transition>
    <div class="flex p-2 gap-2 bg-white/30 border border-gray-200 shadow-md items-center rounded-xl">
        <input class="w-[40px] h-[40px] text-sm md:text-md text-center rounded-xl p-2 outline-none" @change="e => currentWeek = e.target.value" type="number" placeholder="M" :value="currentWeek" :disabled="!onEdit">

        <input class="w-[160px] h-[40px] text-sm md:text-md md:w-[300px] rounded-xl p-2 outline-none" @change="e => currentName = e.target.value" placeholder="Nama jadwal" :value="currentName" :disabled="!onEdit">
        <div class="flex flex-col md:flex-row gap-1">
            <select class="rounded-xl p-1 md:p-2 text-sm md:text-md" v-model="currentStatus" :disabled="!onEdit">
                <option disabled>Pilih salah satu</option>
                <option value="completed" :selected="currentStatus=='completed'">Completed</option>
                <option value="ongoing" :selected="currentStatus=='ongoing'">Ongoing</option>
                <option value="scheduled" :selected="currentStatus=='scheduled'">Scheduled</option>
            </select>
            
    
            <!-- Not on edit -->
            <button class="text-sm md:text-md rounded-xl p-1 px-2 bg-teal-300" v-if="!onEdit" @click="onEdit = !onEdit">Edit</button>
    
            <!-- On Edit -->
            <button class="text-sm md:text-md rounded-xl p-1 px-2 bg-teal-300" v-if="onEdit" @click="submitEdit">Edit</button>
            <button class="text-sm md:text-md rounded-xl p-1 px-2 bg-rose-300" v-if="onEdit" @click="cancelEdit">Cancel</button>
        </div>
        
        
    </div>
</template>
<style>
input::-webkit-inner-spin-button, input::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin:0
}
input[type=number]{
    -moz-appearance: textfield;
}

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
