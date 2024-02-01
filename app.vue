
<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  AcademicCapIcon,
  SquaresPlusIcon,
  XMarkIcon,
  FolderIcon,
  PlayIcon,
  InboxIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'

const material = [
  { name: 'Coach Materials', description: 'All coaches material over the week.', href: '/material/coach', icon: AcademicCapIcon },
  { name: 'Discussed Materials', description: 'All material that have been discussed together with us.', href: '/material', icon: FolderIcon},
  { name: 'Video Materials', description: 'All material explanation by videos.', href: '/material/video', icon: PlayIcon},
]
const callsToAction = { name: 'Contact us', href: '#', icon: InboxIcon }

import {useStore} from './store/store.js'
const store = useStore()
const router = useRouter()

function handleLogout(){
  store.reset()
  router.push('/')
  router.go(0)
}

const mobileMenuOpen = ref(false)
</script>
<template>
  <header class="z-1 border-b bg-white/30 backdrop-blur-md">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Mikroskil Programming Club</span>
          <img class="h-8 w-auto" src="./assets/images/logo.png" alt="" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <Popover class="relative">
          <PopoverButton v-if="store.isAuthenticated" class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Material
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in material" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                  <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <NuxtLink :to="item.href" class="block font-semibold text-gray-900">
                      {{ item.name }}
                      <span class="absolute inset-0"/>
                    </NuxtLink>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
              <div class="grid divide-x divide-gray-900/5 bg-gray-50">
                <NuxtLink to="/contact-us" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                  <component :is="InboxIcon" class="h-6 w-6 flex-none text-gray-400 group-hover:text-indigo-400" aria-hidden="true" />
                  Contact us
                </NuxtLink>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <NuxtLink to="/news" class="text-sm font-semibold leading-6 text-gray-900">News</NuxtLink>
        <NuxtLink to="/schedule" class="text-sm font-semibold leading-6 text-gray-900">Schedule</NuxtLink>
        <NuxtLink to="/events" class="text-sm font-semibold leading-6 text-gray-900">Events</NuxtLink>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink v-if="store.isAdmin" to="/members" class="text-sm font-semibold leading-6 text-gray-900">Members</NuxtLink>
        <a @click="handleLogout" v-if="store.isAuthenticated" class="text-sm ml-6 font-semibold leading-6 text-gray-900">Logout</a>
        <NuxtLink v-if="!store.isAuthenticated" to="/register" class="text-sm font-semibold leading-6 text-gray-900">Register <span aria-hidden="true">&rarr;</span></NuxtLink>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink href="/" class="-m-1.5 p-1.5 mx-auto">
            <span class="sr-only">Mikroskil Programming Club</span>
            <img class="h-12 w-auto" src="./assets/images/logo_small.png" alt="" />
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Product
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in [...material]" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
              <a href="/news" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">News</a>
              <a href="/schedule" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Schedule</a>
              <a href="/events" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Events</a>
            </div>
            <div class="py-6">
              <a v-if="store.isAuthenticated" href="/members" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Members</a>
              <a @click="handleLogout" v-if="store.isAuthenticated" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Logout</a>
              <a v-if="!store.isAuthenticated" href="/register" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Register</a>
              <a v-if="!store.isAuthenticated" href="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
            </div>
            <div class="py-6">
              <a href="/contact-us" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact Us</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  <NuxtLayout>
    <div>
      <NuxtPage/>
    </div>   
  </NuxtLayout>
</template>

<style scoped>
a{
  color: black;
  transition: 0.1s ease-in;
}
a:hover{
  color:gray;
}
</style>
