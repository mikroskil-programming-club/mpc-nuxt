import { CurrentWeek } from "~/models/currentWeek"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 401,
        statusMessage: "Silahkan login kembali."
    })
    const config = useRuntimeConfig()
    try{
        await jwt.verify(token, config.tokenKey)
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."
        })
    }
    try{
        await CurrentWeek.deleteOne()
        return {status:201, message:"Berhasil menghapus gambar."}
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir"
        })
    }
    
})