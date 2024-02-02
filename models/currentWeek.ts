import {Schema, model} from 'mongoose'

const CurrentSchema = new Schema({
    imagesLink:{
        type: String,
    }
})

export const CurrentWeek = model<any>('CurrentWeek',CurrentSchema)