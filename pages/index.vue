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
        console.log(response.data)
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
        <alert v-if='showAlert' :messages="responseMessage"/>
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
::-webkit-scrollbar{
    display:none
}
</style>