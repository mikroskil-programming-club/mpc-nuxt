<script setup>
import contactCard from '~/components/contact-card.vue';
import { ref } from 'vue'
const contacts = [
    {name:"Naomi Prisella",images:"https://media.licdn.com/dms/image/D4D03AQFuYT4YCvojvw/profile-displayphoto-shrink_800_800/0/1668435287758?e=1712188800&v=beta&t=wOSRqBI_WUlg-JNAtxqCUzFBXaByGPgzMx-Q9wbIxCQ",link:"https://wa.me/6281260166555"},
    {name:"Raymond Tju",images:"https://media.licdn.com/dms/image/D5603AQGQIATVx3MOHQ/profile-displayphoto-shrink_800_800/0/1701709485441?e=1712188800&v=beta&t=JyY9Z4YGnpgh_ixndSzH7RhQ9niNhqtzGUSsl-qktU0",link:"https://wa.me/6282167252468"},
    {name:"Anderson Usman",images:"https://media.licdn.com/dms/image/D5603AQHmGPS11qrdvg/profile-displayphoto-shrink_800_800/0/1676554572955?e=1712188800&v=beta&t=t01xQW4vC3H05Nz3ZcVWQ_9udFh9ULrOKBnGqF8mV3U",link:"https://wa.me/6287893084586"},
    {name:"Tristan Budiman",images:"https://media.licdn.com/dms/image/D5603AQG5ILa2BJbcMQ/profile-displayphoto-shrink_800_800/0/1692617000581?e=1712188800&v=beta&t=kh6_ETsqe1mg1uOu0JND-gWvo8JOrElqGw1PlEYkTrI",link:"#"},
    {name:"Muhammad Fikri",images:"https://media.licdn.com/dms/image/D5603AQHiurAb7d24ng/profile-displayphoto-shrink_800_800/0/1680149648357?e=1712188800&v=beta&t=IBB1z889Txizk-_-Vigs_XPDbI9KWOf6eHiq7DDRGEM",link:"https://wa.me/6285172010442"},
    {name:"Samuel Onasis",images:"https://media.licdn.com/dms/image/D5603AQEu_WvfKHeuDA/profile-displayphoto-shrink_800_800/0/1706368789466?e=1712188800&v=beta&t=nuZjdwi9EqVDfb3tXV3nuRTtG4Bqsup5t-P-XaRApfE",link:"https://wa.me/6282167252468"},
]

const NIM = ref('')
const problem = ref('')

const handleNIM = (e) => {
    NIM.value = e.target.value
}
const handleProblem = (e) => {
    problem.value = e.target.value
}

const handleSubmit = ()=>{
    console.log(NIM.value, problem.value)
}

</script>
<template>
    <div class="flex flex-col divide-y p-10">
        <div class="flex justify-center py-10 pt-0 font-semibold text-2xl">Contact Us</div>
        <div class="py-10 flex flex-col mx-auto gap-6 md:grid md:grid-cols-6">
        <contactCard v-for="contact in contacts" :name="contact.name" :images="contact.images" :link="contact.link"/>
        </div>
        
        <div class="flex flex-col items-center justify-center">
            <div class="flex justify-center py-10 font-semibold text-2xl">Form Submission</div>
            <div class="w-[300px] mx-auto md:w-[800px] flex flex-col gap-4">
                <input @change="handleNIM" class="p-4 rounded-xl shadow-lg" placeholder="NIM" type="text">
                <textarea @change="handleProblem" class="p-4 rounded-xl shadow-lg text-start h-[200px]" placeholder="Problems" type="text"/>  
                <button @click="handleSubmit" class="mx-auto bg-blue-300 w-40 p-2 rounded-xl hover:bg-blue-400 shadow-lg">Submit</button>
            </div>
        </div>
    </div>
</template>