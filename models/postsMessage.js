import mongoose from "mongoose";

const postschema =  mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    liked:{
        type:Number,
        default: 0
    },
    selectedFile:String,
    createdAt:{
        type: Date,
        default: new Date()
    }
}, {
    collection: 'posts'
})

const postMessage = mongoose.model('PostMessage', postschema);

export default postMessage