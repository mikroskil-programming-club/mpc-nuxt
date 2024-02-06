import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const { prodi, kelas, semester } = await readBody(event)
    if(!prodi || !kelas || !semester) throw createError({
        statusCode: 404,
        statusMessage: "Kedua data nama tidak boleh kosong."
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
    try{
        const users = await User.findOneAndUpdate({
            NIM:decoded.nim
        },{
            kelas: kelas,
            prodi: prodi,
            semester: semester
        })
        return  {status: 200, message: "Berhasil mengubah data studi user."}
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Terjadi error pada endpoint."
        })
    }
    
})