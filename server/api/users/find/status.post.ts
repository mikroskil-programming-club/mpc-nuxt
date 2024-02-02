import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    const {data} = await readBody(event)
    if(data == false){
        const users = await User.find({
            $or:[{password:null}]
        })
        return users
    }else{
        const users = await User.find({
            password: { $ne : null }
        })
        return users
    }
    
    

})