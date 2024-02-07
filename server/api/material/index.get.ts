import { DiscussionMaterial } from '~/models/discussionMaterial'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        const config = useRuntimeConfig()
        const decoded = await jwt.verify(token, config.tokenKey)
        if(!decoded) throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."
        })
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."
        })
    }
    try{
        const discussionMaterial = DiscussionMaterial.find().distinct("week")
        return discussionMaterial
    }catch(err){
        if(err.statusCode == 405){
            throw createError(err)
        }
        throw createError({
            statusCode: 400,
            statusMessage: "Terjadi kesalahan pada endpoint."
        })
    }
    
})