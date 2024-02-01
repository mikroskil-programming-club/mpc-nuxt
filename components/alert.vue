<script setup>
const props = defineProps(['messages'])

</script>
<template>
    <div class="absolute bottom-0  right-0 m-10 bg-blue-200 md:w-[400px] p-5 rounded-lg">{{props.messages}}</div>
</template>
<style scoped>
</style>