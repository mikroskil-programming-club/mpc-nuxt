import { useStore } from "~/store/store"
import axios from "axios"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useStore()
    if(to.path == "/register" && (!from.path=="/members" || !from.path == "/material") && store.isAuthenticated) return navigateTo('/')
    if(to.path == "/login" && (!from.path=="/members" || !from.path == "/material") && store.isAuthenticated) return navigateTo('/')
    if(to.path == "/members"){ axios.post('/api/users/verify',{token:store.token}).catch(()=>{store.reset(); return navigateTo('/login')})}
    if(to.path == "/members" && !store.isAuthenticated && !store.isAdmin) {return navigateTo('/login')}
    if((to.path == "/material" || to.path == "/material/coach" || to.path == "/material/video")){ axios.post('/api/users/verify',{token:store.token}).catch(()=>{store.reset(); return navigateTo('/login')})}
    if((to.path == "/material" || to.path == "/material/coach" || to.path == "/material/video") && !store.isAuthenticated) {return navigateTo('/login')}
  })
  