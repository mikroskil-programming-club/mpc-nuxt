<script setup>
import axios from 'axios';
import taskCard from '~/components/task-card.vue';
const responseMessage = ref('')
const showAlert = ref(false)
const task_data = ref(null)
const currentImages = ref('')

async function loadData(){
    try{
        showAlert.value = true
        responseMessage.value = "Fetching tasks..."
        let response = await axios.get('/api/task')
        task_data.value = response.data
        task_data.value = task_data.value.sort((a,b)=> a.no - b.no )
        responseMessage.value = "Fetching images..."
        response = await axios.get('/api/task/currentWeek')
        currentImages.value = response.data.imagesLink
        showAlert.value = false
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
        }
    }
    
}

onMounted(loadData)
</script>

<template>
    <Transition name="fade">
        <div v-if="showAlert" class="fixed w-full h-full flex justify-center my-[200px]">
                <div class="text-center fixed align-middle bg-blue-400 rounded-lg p-4 max-h-[60px] w-[300px] md:w-[400px]" >{{ responseMessage }}</div>
                <div class="fixed text-center align-middle animate-pulse  w-[300px] bg-blue-200 rounded-lg p-4 w-[300px] max-h-[60px] md:w-[400px]">{{ responseMessage }}</div>
                
        </div>
    </Transition>
    <div v-if="currentImages && task_data" class="flex flex-col md:flex-row p-4 gap-5 items-center md:justify-center divide-y divide-gray-200">
        <div class="flex items-center justify-center w-auto max-w-[392px] md:h-[405px] md:w-[400px] rounded-xl overflow-hidden p-2 border-2 border-gray-200 bg-white/30">
            <img class="rounded-xl h-full object-cover" :src="currentImages">
        </div>
        <div class="flex bg-white/30 rounded-xl flex-col border-2 divide-y h-[290px] md:h-[405px] overflow-scroll">
            <taskCard v-for="task in task_data" :task_id="task.no" :task_name="task.task" :task_status="task.status"/>
        </div>
    </div>
    
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
}
.fade-enter-from, .fade-leave-to {
    transform: scale(0.8);
    opacity: 0;
}
::-webkit-scrollbar{
    display:none
}
</style>