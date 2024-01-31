<script setup>
const props = defineProps(['images','name','link'])
</script>

<template>
    <div class="flex flex-row max-w-[600px] md:flex-col md:max-w-[200px] gap-4 border border-solid border-gray-200 rounded-lg p-2 bg-white/30 shadow-lg overflow-scroll">
        <img class="object-cover w-[75px] md:w-auto md:h-[400px] rounded-md" :src="props.images">
        <div class="flex mx-auto md:max-w-[50px] text-center items-center md:justify-center font-semibold">{{ props.name }}</div>
        <div class="flex items-center justify-center">
            <a class="flex max-w-[90px] max-h-[60px] md:max-w-[200px] md:max-h-auto items-center justify-center text-center bg-green-400 rounded-2xl p-2" :href="props.link">Chat on WhatsApp</a>
        </div>
    </div>
</template>

<style scoped>
div::-webkit-scrollbar{
    display:none
}
div{
    -ms-overflow-style: none;
    scrollbar-width:none;
}
</style>