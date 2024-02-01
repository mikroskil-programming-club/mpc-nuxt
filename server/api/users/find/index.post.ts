import {User} from '@/models/Users'

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    if(isNaN(parseInt(body.data))){
      let users = await User.find({
        fullName: { $regex: '.*' + body.data + '.*', $options: "i" }
      })
      return users
    }else{
      let users = await User.find({
        NIM: parseInt(body.data)
      })
      return users
    }
    
    
})