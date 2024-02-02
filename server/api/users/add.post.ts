import {User} from '@/models/Users'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const { nim, fullName, firstName, email, semester, prodi, kelas } = await readBody(event)
    if(!nim || isNaN(parseInt(nim)) || !fullName || !firstName || !email || !semester || !prodi || !kelas) throw createError({
        statusCode: 404,
        statusMessage: "Pastikan data terisi sepenuhnya."
    })
    const headers =  getRequestHeaders(event).authorization
    if(!headers) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    const token = headers.split(' ')[1]
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        const config = useRuntimeConfig()
        const decoded = jwt.verify(token, config.tokenKey)
    }catch(err){
        console.log(err)
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir"
        })
    } 
    let users = await User.findOne({
        $or:[
            {NIM:nim}
        ]
    })
    if(users) throw createError({
        statusCode:400,
        statusMessage: "User sudah terdaftar."
    })
    users = await User.create({
        NIM: nim,
        fullName: fullName,
        firstName: firstName,
        email: email,
        semester: semester,
        prodi: prodi
    })
    return {status:201, message:`Berhasil menambahkan user ${firstName}`}
})