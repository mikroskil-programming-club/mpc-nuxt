<script setup>
const props = defineProps(['messages'])

</script>
<template>
    <div class="fixed z-[9999] right-0 bottom-0  m-10 bg-blue-200 md:w-[400px] md:max-w-[600px] p-5 rounded-lg">{{props.messages}}</div>
</template>
<style scoped>
</style>