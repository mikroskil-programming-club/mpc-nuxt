import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event)=>{
    const { oldPassword, newPassword, confirmPassword } = await readBody(event)
    if(!oldPassword || !newPassword || !confirmPassword) throw createError({
        statusCode: 404,
        statusMessage: "Kedua data nama tidak boleh kosong."
    })
    if(newPassword != confirmPassword) throw createError({
        statusCode: 404,
        statusMessage: "Password dan konfirmasi password tidak sama."
    })
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode:400,
        statusMessage: "Silahkan login kembali."
    })
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.tokenKey)
    if(!decoded) throw createError({
        statusCode: 401,
        statusMessage: "Sesi telah berakhir."
    })
    const users = await User.findOne({NIM:decoded.nim})
    const compare = await bcrypt.compare(oldPassword, users.password)
    if(!compare) throw createError({
        statusCode: 401,
        statusMessage: "Password lama salah."
    })
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(newPassword, salt)
    await User.updateOne({
        NIM:decoded.nim
    },{
        password: hashPassword
    })
    return {status: 200, message:"Password berhasil diubah, silahkan login kembali."}
    
})