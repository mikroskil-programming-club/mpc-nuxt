import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    NIM:{
        type: Number,
    }, //Display di profile, dan members
    firstName:{
        type: String,
    }, //Untuk display di dialog
    email:{
        type: String,
    }, //Display di profile, dan OAUTH Microsoft
    fullName:{
        type: String,
    }, //Display di profile, dan members
    semester:{
        type: Number,
    }, //Display di profile, dan members modal [ dapat diubah member ]
    prodi:{
        type: String,
    }, //Display di profile, dan members modal
    paid:{
        type: Boolean,
    }, //Display di profile, dan 
    password:{
        type: String,
    }, //Display di profile, dan members modal (sebagai bcrypt, dapat diubah oleh admin) [ dapat diubah member ]
    isAdmin:{
        type: Boolean,
    }, //Don't display, only return as token

})

export const User = model<any>('User',UserSchema)