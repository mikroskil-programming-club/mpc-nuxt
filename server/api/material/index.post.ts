import { DiscussionMaterial } from '~/models/discussionMaterial'
import { VideoMaterial } from '~/models/videoMaterial'
import { CoachMaterial } from '~/models/coachMaterial'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const { selection, week, title, link } = await readBody(event)
    if(!week || !title || !link) throw createError({
        statusCode: 404,
        statusMessage: "Data harus diisi semua."
    })
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        if(selection == "discussion"){
            await DiscussionMaterial.create({
                week: week,
                title: title,
                pdfLink: link
            })
            return { status: 200, message: `Materi diskusi berhasil di tambahkan pada minggu ${week}.` }
        }
        else if(selection == "coach"){
            await CoachMaterial.create({
                week: week,
                title: title,
                pdfLink: link
            })
            return { status: 200, message: `Materi coach berhasil di tambahkan pada minggu ${week}.` }
        }
        else if(selection == "discussion"){
            await VideoMaterial.create({
                week: week,
                title: title,
                videoLink: link
            })
            return { status: 200, message: `Materi video berhasil di tambahkan pada minggu ${week}.` }
        }
        else{
            throw createError({
                statusCode: 405,
                statusMessage: "Pilihan tidak tersedia."
            })
        }
    }catch(err){
        if(err.statusCode == 405){
            throw createError(err)
        }
        throw createError({
            statusCode: 400,
            statusMessage: "Terjadi kesalahan pada endpoint."
        })
    }
    
})