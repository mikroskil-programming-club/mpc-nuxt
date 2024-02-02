import {Schema, model} from 'mongoose'

const TaskSchema = new Schema({
    no:{
        type: Number,
    }, //Hanya untuk sort mingguan
    task:{
        type: String,
    }, //Nama task
    status:{
        type: String,
    } //Status task

})

export const Task = model<any>('Task',TaskSchema)