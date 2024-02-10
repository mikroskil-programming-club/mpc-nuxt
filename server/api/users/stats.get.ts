import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    let payload = {
        paid:0,
        unpaid:0,
        registered:0,
        unregistered:0,
        total:0
    }
    let users = await User.countDocuments({paid:true})
    payload.paid = users
    users = await User.countDocuments({password:{$ne:null}})
    payload.registered = users
    users = await User.countDocuments()
    payload.unpaid = users - payload.paid
    payload.unregistered = users - payload.registered
    payload.total = users
    return payload
})