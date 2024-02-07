<script setup>
import axios from 'axios'; 
import taskEdit from '~/components/task-edit.vue';

const showAlert = ref(false)
const responseMessage = ref('')
const datas = ref(null)

async function loadData(){
    try{
        responseMessage.value = "Mengambil jadwal.."
        showAlert.value = true
        const response = await axios.get('/api/task')
        datas.value = response.data
        datas.value = datas.value.sort((a,b)=> a.no - b.no )
        setTimeout(() => {
            showAlert.value = false
        }, 600);
    }catch(err){
        console.log(err)
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(() => {
                showAlert.value = false
        }, 1200);
        }
    }
}

onMounted(loadData)
</script>

<template>
    <Transition name="fade">
            <alert v-if="showAlert" :messages="responseMessage"/>
    </Transition>
    <div v-if="datas" class="flex flex-col justify-center items-center mt-5 md:mt-10">
        <div class="flex flex-col lg:grid lg:grid-cols-2 gap-3 h-[630px] overflow-scroll rounded-xl md:h-auto md:overflow-hidden">
            <taskEdit v-for="data in datas"
            :task_id="data.no"
            :task_name="data.task"
            :task_status="data.status"/>
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