<template>
    <div class="flex border-solid border-2 border-gray-200 rounded-xl mx-auto w-fit max-w-full md:max-w-[800px] mt-8 overflow-hidden">
        <div class="hidden lg:block">
            <img class="object-cover max-w-[400px] h-full" src="../assets/images/forms_images.png" alt="">
        </div>
        <form class="wrapper w-[350px] sm:w-[400px] flex flex-col justify-center bg-white/30 p-8">
            <div class="mx-auto font-semibold mb-8"> Login </div>
            <hr class="mb-8">
            <div>Email</div>
            <input class="mb-8" type="text">
            <div>Password</div>
            <input class="mb-8" type="password">
            <button class="bg-gray-200 mt-4 rounded-xl min-w-[100px] sm:w-[200px] mx-auto p-2 hover:bg-gray-300">Login</button>
            <div class="mt-4 mx-auto">Don't have an account? <NuxtLink class="text-green-400 hover:text-green-500" to="/register">Register</NuxtLink></div>
        </form>
    </div>
    
</template>

<style scoped>
    form.wrapper input{
        background: none;
        border-bottom: 1px solid gray;
        outline: none;
        padding:8px;
    }
</style>