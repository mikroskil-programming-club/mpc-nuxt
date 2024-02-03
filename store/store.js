import { jwtDecode } from "jwt-decode"

export const useStore = defineStore('token',{
    state: ()=>({
        token: null,
        isAuthenticated: false
    }),
    getters:{
        isAdmin:(state)=>{
            if(state.token) return jwtDecode(state.token).isAdmin
            return false
        },
    },
    actions:{
        setToken(token){
            this.token = token
            localStorage.setItem('token',token)
            const decoded = jwtDecode(token)
            this.isAuthenticated = true
        },
        reset(){
            this.token = false,
            this.isAuthenticated = false,
            localStorage.clear()
        }
    },
    persist:true
})