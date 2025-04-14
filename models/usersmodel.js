import mongoose from 'mongoose'

const schema = mongoose.Schema({
    user:String,
    password:String,
    email:String,
    
}, {Collection:'users'})

const users = mongoose.model('Users',schema)

export default users