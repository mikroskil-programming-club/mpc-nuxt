import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    
    const users = await User.find()
    return users
})