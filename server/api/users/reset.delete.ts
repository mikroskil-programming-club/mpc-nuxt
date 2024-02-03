import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const { nim, token } = await readBody(event)
    const config = useRuntimeConfig()
    if(!token) throw createError({
        statusCode:401,
        statusMessage: 'Silahkan login kembali.'
    })
    try{
        const decoded = jwt.verify(token, config.tokenKey)
        if(!decoded.isAdmin) throw createError({
            statusCode:401,
            statusMessage: 'Sesi telah berakhir.'})
        let users = await User.findOneAndUpdate({NIM:nim},{$unset:{password:null}})
        console.log(users)
        if(!users) throw createError({
            statusCode:401,
            statusMessage: 'Terjadi error pada endpoint.'
        })
        return {status:200, message: `Berhasil menghapus password untuk user ${users.firstName}`}
    }catch(err){
        throw createError({
            statusCode:401,
            statusMessage: 'Sesi telah berakhir.'
        })
    }
})