import { useStore } from "~/store/store"
import axios from "axios"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useStore()
    if(to.path == "/register" && store.isAuthenticated) return navigateTo('/')
    if(to.path == "/login" && store.isAuthenticated) return navigateTo('/')
    if((to.path == "/manage/events" ||
    to.path == "/manage/material" ||
    to.path == "/manage/schedule" ) && (!store.isAuthenticated || !store.isAdmin)) 
    return navigateTo('/')
    if(to.path == "/members" && !store.isAuthenticated) {return navigateTo('/login')}
    if((to.path == "/material" || 
    to.path == "/material/coach" || 
    to.path == "/material/video") 
    && !store.isAuthenticated) {return navigateTo('/login')}
  })
  