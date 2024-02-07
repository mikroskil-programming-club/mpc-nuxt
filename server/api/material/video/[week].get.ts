import { VideoMaterial } from '~/models/videoMaterial'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        const config = useRuntimeConfig()
        jwt.verify(token,config.tokenKey)
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."
        })
    }
    const week = getRouterParam(event, "week")
    if(!week) throw createError({
        statusCode:404,
        statusMessage: "Minggu tidak ditemukan."
    })
    try{
        const videomaterial = await VideoMaterial.find({
            week: week
        })
        if(!videomaterial){
            throw createError({
                statusCode: 404,
                statusMessage: "Materi tidak ditemukan."
            })
        }
        return videomaterial
    }catch(err){
        if(err.statusCode = 404){
            throw createError(err)
        }
        throw createError({
            statusCode: 400,
            statusMessage: "Terjadi kesalahan pada endpoint."
        })
    }
})