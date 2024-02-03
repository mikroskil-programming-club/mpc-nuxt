import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const {nim, token} = await readBody(event)
    const config = useRuntimeConfig()
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        let users = await User.findOne({NIM:nim})
        const decoded = jwt.verify(token, config.tokenKey)
        if(decoded.isAdmin != true) throw createError({
            statusCode:401,
            statusMessage: "Kamu tidak memiliki akses tersebut."
        })
        if(!users) throw createError({
            statusCode:401,
            statusMessage: 'Something is wrong with the endpoint.'
        })
        if(!users.paid){
            users = await User.findOneAndUpdate({NIM:nim},{paid:true})
            return {status:200, message : 'Berhasil mengubah status menjadi "Completed".'}
        }
        else{
            users = await User.findOneAndUpdate({NIM:nim},{paid:false})
            return {status:200, message : 'Berhasil mengubah status menjadi "Uncompleted".'}
        }
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."})}
    })