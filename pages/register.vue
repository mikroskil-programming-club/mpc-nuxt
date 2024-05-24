<script setup>
useSeoMeta({
  title: "Mikroskil Programming Club | Register",
});
import { ref } from "vue";
import axios from "axios";
import alert from "~/components/alert.vue";

const router = useRouter();
const NIM = ref("");
const password = ref("");
const confirmPassword = ref("");
const hidePassword = ref(true);
const hidePasswordValue = ref("SHOW");

function nimHandle(e) {
  NIM.value = e.target.value;
}

const showAlert = ref(false);
const responseMessage = ref("");
async function submitHandle() {
  try {
    showAlert.value = true;
    responseMessage.value = "Loading...";
    const response = await axios.post("/api/users/register", {
      NIM: NIM.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
    if (response.data.status == 201) {
      responseMessage.value = response.data.message;
      setTimeout(() => {
        showAlert.value = false;
        router.push("/login");
      }, 1200);
    }
  } catch (err) {
    if (err.response.data.statusCode) {
      responseMessage.value = err.response.data.message;
      setTimeout(() => {
        showAlert.value = false;
      }, 1600);
    }
  }
}

const hideValueHandle = () => {
  if (hidePassword.value == true) {
    hidePasswordValue.value = "HIDE";
    hidePassword.value = false;
  } else if (hidePassword.value == false) {
    hidePasswordValue.value = "SHOW";
    hidePassword.value = true;
  }
};
</script>

<template>
  <Transition name="fade">
    <alert v-if="showAlert" :messages="responseMessage" />
  </Transition>
  <div
    class="flex border-solid border-2 border-gray-200 rounded-xl mx-auto w-fit max-w-full md:max-w-[800px] mt-8 overflow-hidden min-h-[550px]"
  >
    <div class="hidden lg:block">
      <img
        class="object-cover max-w-[400px] h-full"
        src="../assets/images/forms_images.png"
        alt=""
      />
    </div>
    <div
      class="wrapper w-[350px] sm:w-[400px] flex flex-col justify-center gap-4 bg-white/30 p-8"
    >
      <h1 class="mx-auto font-semibold">Register</h1>
      <hr />
      <div class="flex flex-col gap-8">
        <div class="flex flex-col">
          <div>NIM</div>
          <input @change="nimHandle" type="text" />
        </div>
        <div class="flex flex-col">
          <div class="flex gap-5 items-center mb-2">
            <div>Password</div>
            <div
              @click="hideValueHandle"
              class="md:hidden cursor-pointer bg-gray-300 w-[60px] text-center rounded-md hover:bg-gray-400 font-semibold"
            >
              {{ hidePasswordValue }}
            </div>
            <div
              @mouseup="(hidePassword = true), (hidePasswordValue = 'SHOW')"
              @mousedown="(hidePassword = false), (hidePasswordValue = 'HIDE')"
              class="hidden md:block cursor-pointer bg-gray-300 w-[60px] text-center rounded-md hover:bg-gray-400 font-semibold"
            >
              {{ hidePasswordValue }}
            </div>
          </div>
          <input
            v-if="hidePassword"
            type="password"
            :value="password"
            @change="(e) => (password = e.target.value)"
            class="w-full outline-none border-b-[1px] p-2"
          />
          <input
            v-if="!hidePassword"
            type="text"
            :value="password"
            @change="(e) => (password = e.target.value)"
            class="w-full outline-none border-b-[1px] p-2"
          />
        </div>
        <div class="flex flex-col">
          <div>Confirm Password</div>
          <input
            v-if="hidePassword"
            type="password"
            :value="confirmPassword"
            @change="(e) => (confirmPassword = e.target.value)"
            class="w-full outline-none border-b-[1px] p-2"
          />
          <input
            v-if="!hidePassword"
            type="text"
            :value="confirmPassword"
            @change="(e) => (confirmPassword = e.target.value)"
            class="w-full outline-none border-b-[1px] p-2"
          />
        </div>
        <button
          @click="submitHandle"
          class="bg-gray-200 mt-4 rounded-xl min-w-[100px] sm:w-[200px] mx-auto p-2 hover:bg-gray-300"
        >
          Register
        </button>
      </div>
      <div class="flex-1 mx-auto content-end mt-4">
        <span>Already have an account? &nbsp;</span>
        <NuxtLink class="text-green-400 hover:text-green-500" to="/login"
          >Login</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
div.wrapper input {
  background: none;
  border-bottom: 1px solid gray;
  outline: none;
  padding: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: ease-in-out 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(40px);
}
</style>
