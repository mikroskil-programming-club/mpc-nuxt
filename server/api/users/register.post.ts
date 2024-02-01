import {User} from '@/models/Users'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event)=>{
    const {NIM, password, confirmPassword} = await readBody(event)
    if(!NIM || !password || !confirmPassword) throw createError({
        statusCode:400,
        statusMessage: "NIM, Password atau Confirm Password harus diisi."
    })
    if(password != confirmPassword) throw createError({
        statusCode: 400,
        statusMessage: "Password dan Confirm Password berbeda."
    })
    let users = await User.findOne({
        NIM: NIM
    })
    if(!users) throw createError({
        statusCode:401,
        statusMessage: "NIM tidak terdaftar."
    })
    if(users.password) throw createError({
        statusCode:401,
        statusMessage: "User sudah terdaftar."
    })
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    users = await User.findOneAndUpdate({
        NIM:NIM
    },{
        password: hashPassword
    })
    return {status:201, message: "Kamu berhasil terdaftar."}
})