import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    let payload = {
        paid:0,
        unpaid:0,
        total:0
    }
    let users = await User.countDocuments({paid:true})
    payload.paid = users
    users = await User.countDocuments()
    payload.total = users
    payload.unpaid = payload.total - payload.paid
    return payload
})