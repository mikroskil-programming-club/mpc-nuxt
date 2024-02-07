import { Task } from "~/models/Tasks"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const token = getRequestHeaders(event).authorization?.split(' ')[1]
    if(!token) throw createError({
        statusCode: 401,
        statusMessage: "Silahkan login kembali."
    })
    const config = useRuntimeConfig()
    try{
        await jwt.verify(token, config.tokenKey)
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir."
        })
    }
    const { no, new_no, task, status } = await readBody(event)
    if(!no || !new_no || !task || !status)throw createError({
        statusCode: 405,
        statusMessage: "Data tidak boleh kosong."
    })
    try{
        const tasks = await Task.findOneAndUpdate({
            no: no
        },{
            no: new_no,
            task: task,
            status: status
        },{new:true})
        if(task) return {status: 201, message:"Berhasil mengupdate jadwal."}
    }catch(err){
        throw createError({
            statusCode: 404,
            statusMessage: "Terjadi kesalahan pada endpoint."
        })
    }
})