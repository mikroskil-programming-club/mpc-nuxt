<script setup>
import axios from 'axios';
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useStore } from '~/store/store';
import { useBase64 } from '@vueuse/core';

const selection = [
  { value: "coach", name: 'Coach Material' },
  { value: "discussion", name: 'Discussion Material' },
  { value: "video", name: 'Video Material' },
]

const store = useStore
const selected = ref(selection[0])
const query = ref('')
const showAlert = ref(false)
const responseMessage = ref('')

const title = ref('')
const week = ref('')
const file = ref(null)
const link = ref('')
const pdfBase64 = useBase64(file)
function handleInput(e){
    if(!e.target.files[0]) return
    showAlert.value = true
    responseMessage.value = "Mengupload pdf..."
    file.value = e.target.files[0]
    setTimeout(()=>{
        link.value = pdfBase64.base64.value
        showAlert.value = false
    },600)
}

const sendFiles = async ()=>{
    try{
        showAlert.value = true
        responseMessage.value = "Mengupload data.."
        const response = await axios.post('/api/material',{
            selection: selected.value.value,
            week: week.value,
            title: title.value,
            link: link.value
        },{headers:{Authorization:`Bearer ${store.token}`}})
        responseMessage.value = response.data.message
        setTimeout(()=>{showAlert.value = false},600)
    }catch(err){
        if(err.response.data.statusCode){
            responseMessage.value = err.response.data.message
            setTimeout(()=>{showAlert.value = false},1200)
        }
    }
}

let filteredSelection = computed(() =>
  query.value === ''
    ? selection
    : selection.filter((select) =>
        select.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)


</script>

<template>
    <Transition name="fade">
            <alert v-if="showAlert" :messages="responseMessage"/>
    </Transition>
    <div class="flex flex-col md:flex-rowjustify-center items-center m-10">
        <div class="flex flex-col justify-center md:justify-start md:items-start items-center w-[375px] gap-5 md:w-[400px] bg-white/30 border-2 border-gray-200 p-2 md:p-4">
            <div class="flex justify-center md:justify-start w-72">
                <Combobox v-model="selected" nullable>
                    <div class="relative mt-1">
                        <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <ComboboxInput class="w-full border-none py-2 pl-3 pr-10 rounded-lg text-sm leading-5 text-gray-900 focus:ring-0" :displayValue="(select) => select?.name" @change="query = $event.target.value"/>
                            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                class="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                                />
                            </ComboboxButton>
                        </div>
                        <TransitionRoot
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            @after-leave="query = ''"
                            >
                            <ComboboxOptions class="absolute flex flex-col mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black/5 gap-2 focus:outline-none sm:text-sm">
                                <div v-if="filteredSelection.length === 0 && query !== ''" class="relative cursor-default select-none px-4 py-2 text-gray-700">Pilihan tidak tersedia.</div>
                                <ComboboxOption v-for="select in filteredSelection" as="template" :key="select.id" :value="select" v-slot="{ selected, active }">
                                <li class="relative cursor-pointer select-none py-2 pl-10 pr-4 mx-2 rounded-lg" :class="{ 'bg-teal-400 text-white': active, 'text-gray-900': !active, }">
                                    <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">{{ select.name }}</span>
                                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3" :class="{ 'text-white': active, 'text-teal-400': !active }" >
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                                </ComboboxOption>
                            </ComboboxOptions>
                        </TransitionRoot>
                    </div>
                </Combobox>
            </div>
                
            <div class="w-auto md:max-w-[400px]">
                <div v-if="selected.value=='coach'">
                    <div class="flex flex-col gap-3 ">
                        <h1 class="font-semibold text-xl">Coach Material</h1>
                        <hr>
                        <h2 class="text-justify">Materi-materi yang direferensikan oleh coach dalam bentuk PDF, atau hasil rangkuman pembelajaran bersama coach.</h2>
                        <div class="flex gap-2 items-center">
                            <div>Pertemuan : </div>
                            <input :value="week" @change="e => week = e.target.value" class='bg-transparent text-center border-b border-black outline-none p-1 w-[25px]'>
                        </div>
                        <div class="flex gap-2 items-center">
                            <div>Judul : </div>
                            <input :value="title" @change="e => title = e.target.value" class='bg-transparent border-b border-black outline-none p-1'>
                        </div>
                        <div class="flex gap-2 items-center">
                            <div class="w-[40px]">File : </div>
                            <input @input="handleInput" type='file'>
                        </div>
                        <button @click="sendFiles" class="bg-gray-200 w-[100px] p-1 rounded-lg mx-auto hover:bg-gray-300 shadow-md font-semibold">Submit</button>
                    </div>
                    
                </div>
    
                <div v-if="selected.value=='discussion'">
                    <div class="flex flex-col gap-3 ">
                        <h1 class="font-semibold text-xl">Discussion Material</h1>
                        <hr>
                        <h2 class="text-justify">Materi-materi yang direferensikan oleh pengurus dalam bentuk PDF, atau hasil rangkuman pembelajaran bersama di MPC & grup WhatsApp.</h2>
                        <div class="flex gap-2 items-center">
                            <div>Pertemuan : </div>
                            <input :value="week" @change="e => week = e.target.value" class='bg-transparent text-center border-b border-black outline-none p-1 w-[25px]'>
                        </div>
                        <div class="flex gap-2 items-center">
                            <div>Judul : </div>
                            <input :value="title" @change="e => title = e.target.value" class='bg-transparent border-b border-black outline-none p-1'>
                        </div>
                        <div class="flex gap-2 items-center">
                            <div class="w-[40px]">File : </div>
                            <input @input="handleInput" type='file'>
                        </div>
                        <button @click="sendFiles" class="bg-gray-200 w-[100px] p-1 rounded-lg mx-auto hover:bg-gray-300 shadow-md font-semibold">Submit</button>
                    </div>
                    
                </div>
                
                <div v-if="selected.value=='video'">
                    <div class="flex flex-col gap-3 ">
                        <h1 class="font-semibold text-xl">Video Material</h1>
                        <hr>
                        <h2 class="text-justify">Materi-materi yang direferensikan oleh coach dalam bentuk PDF, atau hasil rangkuman pembelajaran bersama coach.</h2>
                        <div class="flex gap-2 items-center">
                            <div>Pertemuan : </div>
                            <input :value="week" @change="e => week = e.target.value" class='bg-transparent text-center border-b border-black outline-none p-1 w-[25px]'>
                        </div>
                        <div class="flex gap-2 items-center">
                            <div>Judul : </div>
                            <input :value="title" @change="e => title = e.target.value" class='bg-transparent border-b border-black outline-none p-1'>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div>Video Link : </div>
                            <input @change="e => link = e.target.value" class='bg-transparent border-b border-black outline-none p-1'>
                        </div>
                        <button @click="sendFiles" class="bg-gray-200 w-[100px] p-1 rounded-lg mx-auto hover:bg-gray-300 shadow-md font-semibold">Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div>
            <object :data='link'></object>
        </div>
    </div>
    
</template>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: ease-in-out 0.25s;
    }
    .fade-enter-from, .fade-leave-to {
        transform: translateY(40px);
    }
</style>