import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const headers = getRequestHeaders(event).authorization
    if(!headers) throw createError({
        statusCode:400,
        statusMessage: "Silahkan login kembali."
    })
    const token = headers.split(' ')[1]
    if(!token) throw createError({
        statusCode:400, 
        statusMessage: "Silahkan login kembali."
    })
    try{
        const config = useRuntimeConfig()
        const decoded = jwt.verify(token, config.tokenKey)
        if(decoded.isAdmin == true){
            const users = await User.find()
            return users
        }else{
          const users = await User.find().select({password:0, isAdmin:0})
          return users
        }
        
    }catch(err){
      throw createError({
        statusCode: 401,
        statusMessage: "Sesi telah berakhir"
      })
    }    
})