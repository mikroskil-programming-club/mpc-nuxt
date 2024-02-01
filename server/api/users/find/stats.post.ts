import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    const {data} = await readBody(event)
    if(data == false){
        const users = await User.find({
            $or:[{paid: data},{paid:null}]
        })
        return users
    }else{
        const users = await User.find({
            paid: data
        })
        return users
    }
    
    

})