<script setup>
useSeoMeta({
    title: "Mikroskil Programming Club | Contact Us"
})
</script>

<template>
    <div class="flex flex-col divide-y p-10">
        <div class="flex justify-center py-10 pt-0 font-semibold text-2xl">Contact Us</div>
        <div class="flex flex-col items-center justify-center">
            <div class="flex justify-center py-10 font-semibold text-2xl">Form Submission</div>
            <form name="contact" method="POST" action="/netlify-form"
                class="w-[300px] mx-auto md:w-[800px] flex flex-col gap-4" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <input class="p-4 rounded-xl shadow-lg" placeholder="NIM" type="text" name="NIM" required />
                <input class="p-4 rounded-xl shadow-lg" placeholder="Email" type="email"
                    name="email" required />
                <textarea class="p-4 rounded-xl shadow-lg text-start h-[200px]"
                    placeholder="Problems" type="text" name="problem" required />
                <button type="submit"
                    class="mx-auto bg-blue-300 w-40 p-2 rounded-xl hover:bg-blue-400 shadow-lg">Submit</button>
            </form>
        </div>
    </div>
</template>