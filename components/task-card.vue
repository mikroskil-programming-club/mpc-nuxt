<script setup>
    const props = defineProps(['task_id','task_name','task_status'])
</script>

<template>
    <div class="flex p-2">
        <div class="w-full md:w-[400px] p-2 text-orange-400 line-through font-semibold rounded-lg bg-orange-200/30" v-if="task_status == 'completed'">{{ task_name }}</div>
        <div class="w-full md:w-[400px] p-2 text-teal-400 border-2 rounded-lg bg-cyan-100/60 border-teal-400 font-semibold" v-if="task_status == 'ongoing'">{{ task_name }}</div>
        <div class="w-full md:w-[400px] p-2 text-gray-400 rounded-lg bg-gray-200/30 font-semibold" v-if="task_status == 'scheduled'">{{ task_name }}</div>
    </div>
</template>