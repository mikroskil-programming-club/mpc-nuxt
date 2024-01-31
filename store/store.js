export const useStore = defineStore('token',{
    state: ()=>({
        token: null,
        isAdmin:  false,
        isAuthenticated: false
    }),
    actions:{
        setToken(token, isAdmin, isAuthenticated){
            this.token = token
            localStorage.setItem('token',token)
            this.isAdmin = isAdmin
            localStorage.setItem('auth',isAdmin)
            this.isAuthenticated = isAuthenticated
        },
        reset(){
            this.token = null,
            this.isAdmin = false,
            this.isAuthenticated = false,
            localStorage.clear()
        }
    }
})