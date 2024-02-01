import { useStore } from "~/store/store"
import { useLocalStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore()
    if(to.path == "/register" && store.isAuthenticated) return navigateTo('/')
    if(to.path == "/login" && store.isAuthenticated) return navigateTo('/')
    if(to.path == "/members" && !store.isAuthenticated && !store.isAdmin) return navigateTo('/')
  })
  