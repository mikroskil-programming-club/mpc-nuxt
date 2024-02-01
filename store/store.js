import { jwtDecode } from "jwt-decode"

export const useStore = defineStore('token',{
    state: ()=>({
        token: null,
        isAdmin:  null,
        isAuthenticated: false
    }),
    actions:{
        setToken(token, isAdmin, isAuthenticated){
            this.token = token
            localStorage.setItem('token',token)
            const decoded = jwtDecode(token)
            this.isAdmin = decoded.isAdmin
            this.isAuthenticated = true
        },
        reset(){
            this.token = null,
            this.isAdmin = false,
            this.isAuthenticated = false,
            localStorage.clear()
        }
    },
    persist:true
})