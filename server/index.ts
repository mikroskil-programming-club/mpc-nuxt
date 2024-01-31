import { Nitro } from 'nitropack'
import mongoose from 'mongoose'

export default async (_nitroApp: Nitro) => {
    console.log("Accessing Nitro.")
    const config = useRuntimeConfig()
    try{
        await mongoose.connect(config.mongodbURI)
        console.log("Connected to MongoDB")
        
    }catch(err){
        console.log(err)
    }
}