<script setup>
import contactCard from '~/components/contact-card.vue';
import { ref } from 'vue'

const NIM = ref('')
const problem = ref('')
const email = ref('')

const handleNIM = (e) => {
    NIM.value = e.target.value
}
const handleProblem = (e) => {
    problem.value = e.target.value
}
const handleEmail = (e) => {
    email.value = e.target.value
}

const handleSubmit = ()=>{
    console.log(NIM.value, problem.value)
}

</script>
<template>
    <div class="flex flex-col divide-y p-10">
        <div class="flex justify-center py-10 pt-0 font-semibold text-2xl">Contact Us</div>
        <div class="flex flex-col items-center justify-center">
            <div class="flex justify-center py-10 font-semibold text-2xl">Form Submission</div>
            <div class="w-[300px] mx-auto md:w-[800px] flex flex-col gap-4">
                <input @change="handleNIM" class="p-4 rounded-xl shadow-lg" placeholder="NIM" type="text">
                <input @change="handleEmail" class="p-4 rounded-xl shadow-lg" placeholder="Email" type="text">
                <textarea @change="handleProblem" class="p-4 rounded-xl shadow-lg text-start h-[200px]" placeholder="Problems" type="text"/>  
                <button @click="handleSubmit" class="mx-auto bg-blue-300 w-40 p-2 rounded-xl hover:bg-blue-400 shadow-lg">Submit</button>
            </div>
        </div>
    </div>
</template>