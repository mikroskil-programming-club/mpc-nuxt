import {User} from '@/models/Users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const {NIM, password} = await readBody(event)
    if(!NIM || !password) throw createError({
        statusCode: 400,
        statusMessage: "NIM atau Password kosong."
    })
    let users = await User.findOne({
        NIM: NIM
    })
    if(!users) throw createError({
        statusCode:401,
        statusMessage: "NIM tidak terdaftar."
    })
    const compares = await bcrypt.compare(password, users.password)
    if(!compares) throw createError({
        statusCode: 401,
        statusMessage: "NIM atau Password salah."
    }) 
    let isAdmin = false
    if(users.isAdmin){
        isAdmin = true
    }
    const payload = {
        isAdmin: isAdmin
    }
    const config = useRuntimeConfig()
    const token = jwt.sign(payload,config.tokenKey,{
        expiresIn: '1h'
    })
    return {status:200, token : token}
})