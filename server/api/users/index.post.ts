import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    const users = User.find()
    return users
})