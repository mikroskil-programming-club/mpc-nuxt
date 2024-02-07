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
    const {_id} = await readBody(event)
    if(!_id) throw createError({
        statusCode: 405,
        statusMessage: "Data yang dikirim kosong."
    })
    try{
        await DiscussionMaterial.deleteOne({
            _id: _id
        })
        return {status:201, message:"Berhasil menghapus data."}
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