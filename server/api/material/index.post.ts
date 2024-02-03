import { DiscussionMaterial } from '~/models/discussionMaterial'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const { week, title, pdfLink } = await readBody(event)
    if(!week || !title || !pdfLink) throw createError({
        statusCode: 404,
        statusMessage: "Data harus diisi semua."
    })
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        await DiscussionMaterial.create({
            week: week,
            title: title,
            pdfLink: pdfLink
        })
        return { status: 200, message: `Materi berhasil di tambahkan pada minggu ${week}.` }
    }catch(err){
        console.log(err)
        throw createError({
            statusCode: 400,
            statusMessage: "Terjadi kesalahan pada endpoint."
        })
    }
    
})