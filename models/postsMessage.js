import mongoose from "mongoose";

const postschema =  mongoose.Schema({
    creatorid:String,
    title:String,
    message:String,
    creator:String,
    tags:[String],
    liked:{
        type:Array,
        default:[]
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