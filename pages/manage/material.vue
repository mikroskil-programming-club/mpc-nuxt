<script setup>
import axios from 'axios';

const selection = ref("discuss")

</script>

<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col items-center md:items-start m-10 gap-5 md:flex-row md:h-[800px] bg-white/30 broder-2 border-gray-200">
            <div class="flex flex-row md:flex-col gap-8">
                <div v-if="selection!='coach'" @click="selection = 'coach'">Coach Material</div>
                <div class="bg-teal-400 p-2 text-white rounded-xl" v-if="selection=='coach'" @click="selection = 'coach'">Coach Material</div>
                <div @click="selection = 'discuss'">Discussion Material</div>
                <div @click="selection = 'video'">Video Material</div>
            </div>
            <div class="max-w-[600px]">
                <div v-if="selection=='coach'">
                    <div>
                        <h1>Coach Material</h1>
                        <h2>Materi-materi yang direferensikan oleh coach dalam bentuk PDF, atau hasil rangkuman pembelajaran bersama coach.</h2>
                    </div>
                    <div>Materi minggu ke-?</div>
                    <input>
                </div>
    
                <div v-if="selection=='discuss'">
                    <div>
                        <h1>Discussion Material</h1>
                        <h2>Materi-materi yang direferensikan oleh pengurus dalam bentuk PDF, atau hasil rangkuman pembelajaran bersama di MPC dan/atau grup.</h2>
                    </div>
                    <div>Materi minggu ke-?</div>
                    <input>
                </div>
                
                <div v-if="selection=='video'">
                    <div>
                        <h1>Video Material</h1>
                        <h2>Materi-materi yang direferensikan oleh pengurus/coach dalam bentuk video, atau hasil konten buatan mengenai pembelajaran pengurus MPC</h2>
                    </div>
                    <div>Materi minggu ke-?</div>
                    <input>
                </div>
            </div>
        </div>
    </div>
    
</template>