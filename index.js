 import express from 'express'
 import cors from 'cors'
 //import bodyParser from 'body-parser'
 import mongoose from 'mongoose'
 import postroutes from './routes/posts.js';
 import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const connection_url = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(connection_url)
.then(() => {
    app.use('/posts', postroutes)





    
    app.listen(PORT, () =>{
    console.log("server")
    })
}) 
.catch(() => console.log("error"));
mongoose.connection.on('disconnected', () => {
    console.log(' MongoDB disconnected');
  });
  
  mongoose.connection.on('connected', () => {
    console.log(' MongoDB connected');
  });
  
