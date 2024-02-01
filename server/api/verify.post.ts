import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    const {token} = await readBody(event)
    if(!token) throw createError({
        statusCode: 400,
        statusMessage: "Silahkan login kembali."
    })
    try{
        const config = useRuntimeConfig()
        jwt.verify(token, config.tokenKey)
        return {
            status: 201
        }
    }catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: "Sesi telah berakhir"
        })
    }
    })