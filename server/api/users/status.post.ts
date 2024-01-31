import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const {nim, token} = await readBody(event)
    const config = useRuntimeConfig()
    if(!token) return {status:400, message : 'Session expired.'}
    const decoded = jwt.verify(token, config.tokenKey)
    if(!decoded) return {status:401, message : 'Session expired.'}
    let users = await User.findOne({NIM:nim})
    if(!users) throw createError({
        statusCode:401,
        statusMessage: 'Terjadi error pada endpoint.'
    })
    if(!users.paid){
        users = await User.findOneAndUpdate({NIM:nim},{paid:true})
        return "Berhasil mengubah status menjadi 'Completed'"
    }
    else{
        users = await User.findOneAndUpdate({NIM:nim},{paid:false})
        return "Berhasil mengubah status menjadi 'Uncompleted"
    }
})