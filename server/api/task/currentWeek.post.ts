import { CurrentWeek } from "~/models/currentWeek"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const headers = getRequestHeaders(event).authorization
    if(!headers) throw createError({
        statusCode: 401,
        statusMessage: "Silahkan login kembali."
    })
    const token = headers?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 401,
        statusMessage: "Silahkan login kembali."
    })
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.tokenKey)
    if(!decoded) throw createError({
        statusCode: 401,
        statusMessage: "Sesi telah berakhir."
    })
    const { imagesLink } = await readBody(event)
    if(!imagesLink) throw createError({
        statusCode: 404,
        statusMessage: "Wajib mengupload gambar."
    })
    let currentWeek = await CurrentWeek.findOne()
    try{
        if(!currentWeek) {currentWeek = await CurrentWeek.create({
            imagesLink: imagesLink})
            return {status:200, message:"Berhasil mengubah gambar events."}
        }else{
            currentWeek = await CurrentWeek.deleteOne({imagesLink:currentWeek.imagesLink})
            currentWeek = await CurrentWeek.create({imagesLink:imagesLink})
            return {status:200, message:"Berhasil mengubah gambar events."}
        }
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir"
        })
    }
    
})