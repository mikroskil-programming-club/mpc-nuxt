import {User} from '@/models/Users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const {NIM, password} = await readBody(event)
    if(!NIM || !password) throw createError({
        statusCode: 400,
        statusMessage: "NIM atau password tidak boleh kosong."
    })
    let users = await User.findOne({
        NIM: NIM
    })
    if(!users) throw createError({
        statusCode: 400,
        statusMessage: "NIM tidak terdaftar sebagai anggota MPC."
    })
    if(!users.password){
        throw createError({
            statusCode: 400,
            statusMessage: "Anggota belum mendaftarkan akun ke website MPC."
        })
    }
    const compares = await bcrypt.compare(password, users.password)
    if(!compares) throw createError({
        statusCode: 401,
        statusMessage: "Password yang dimasukkan salah."
    })

    let isAdmin = false
    if(users.isAdmin){
        isAdmin = true
    }
    const payload = {
        isAdmin: isAdmin,
        nim:users.NIM
    }
    const config = useRuntimeConfig()
    const token = jwt.sign(payload,config.tokenKey,{
        expiresIn: '1h'
    })
    return {status:200, message: `Selamat datang ${users.firstName}`,token : token}
})