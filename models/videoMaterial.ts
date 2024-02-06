import {Schema, model} from 'mongoose'

const videoSchema = new Schema({
    week:{
        type: Number,
    }, // What week the video explains to
    title:{
        type: String,
    }, // The title to be shown
    videoLink:{
        type: String,
    } // A link to embed
})

export const VideoMaterial = model<any>('VideoMaterial',videoSchema)