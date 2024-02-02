import { Task } from "~/models/Tasks"

export default defineEventHandler(async (event)=>{
    const tasks = await Task.find()
    return tasks 
})