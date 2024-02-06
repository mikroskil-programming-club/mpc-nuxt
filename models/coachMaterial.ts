import {Schema, model} from 'mongoose'

const coachSchema = new Schema({
    week:{
        type: Number,
    }, // What week the pdf belongs to
    title:{
        type: String,
    }, // The title to be shown
    pdfLink:{
        type: String,
    } // Can either be Base64, or Link
})

export const CoachMaterial = model<any>('CoachMaterial',coachSchema)