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
    <div v-if="currentImages && task_data" class="flex flex-col items-center p-4 lg:p-0">
        <div class="relative my-5 lg:mt-5 flex flex-col border-2 lg:bg-white bg-white/30 border-gray-200 lg:w-[90%] overflow-hidden lg:flex-row w-full rounded-xl overflow-hidden max-w-[392px] lg:max-w-full lg:rounded-md md:max-w-[90%] md:flex-row">
            <div class="order-last md:order-first m-5 lg:m-0 2xl:absolute text-slate-900 lg:h-[400px] lg:text-black h-full flex flex-col justify-center lg:mx-7 max-w-[400px]">
                <div class="fonts text-2xl font-semibold my-6 lg:w-[500px] md:w-[400px]">Welcome to <br>Mikroskil Programming Club</div>
                <div class="flex flex-col gap-3 text-justify ">
                    <p>
                        <span class="text-teal-600 font-semibold">Mikroskil Programming Club</span> is a students club that focuses on learning, expertising towards algorithms and complete tasks related to competitive programming. 
                    </p>
                    <p>
                        We are based in <span class="text-teal-600 font-semibold"> Mikroskil University, North Sumatera, Medan, Indonesia. </span> 
                    </p>
                    <p>
                        Our aim is to improve the logical thinking and problem solving skills of our member, together with fun exercises, and mentoring sessions with our coach.
                    </p>
                </div>
            </div>
            <img class="h-[200px] object-cover md:h-auto md:object-right lg:object-right lg:w-full" src="../assets/images/banner.jpg">
        </div>
        <div class="flex flex-col md:flex-row items-center md:justify-center divide-y divide-gray-200 gap-5">
            <div class="flex items-center justify-center w-auto max-w-[392px] md:max-w-[400px] md:h-[405px] rounded-xl overflow-hidden p-2 border-2 border-gray-200 bg-white/30">
                <img class="rounded-xl h-full object-cover" :src="currentImages">
            </div>
            <div class="flex bg-white/30 rounded-xl flex-col border-2 divide-y h-[290px] md:h-[405px] md:max-w-[400px] overflow-scroll">
                <taskCard v-for="task in task_data" :task_id="task.no" :task_name="task.task" :task_status="task.status"/>
            </div>
        </div>
    </div>
    <footer v-if="currentImages && task_data" class="fonts bg-white/30 border-t mt-10 border-gray-200 w-full flex flex-col justify-center items-center text-xs text-gray-400 p-4">
            <div>Copyright ©2023 - 2024</div>
            <div>MPC Universitas Mikroskil</div>
    </footer>
    
    
    
</template>
<style scoped>
.fonts{
    font-family: Poppins;
}
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