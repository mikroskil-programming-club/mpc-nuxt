import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const headers = await getRequestHeaders(event).authorization
    if(!headers) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    const token = headers.split(' ')[1]
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        const config = useRuntimeConfig()
        const decoded = jwt.verify(token, config.tokenKey)
        const users = User.findOne({
            NIM: decoded.nim
        })
        return users
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."
        })
    }
    
})