import express from 'express'
import cors from 'cors'
//import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import postroutes from './routes/posts.js';
import dotenv from 'dotenv'
import userroutes from './routes/users.js'
import cookieParser from 'cookie-parser';
import {authorise} from './middlewares/auth.js'


dotenv.config()
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin:'https://transcendent-alpaca-5082ae.netlify.app/',
  credentials:true,
}));
app.use(cookieParser())

const connection_url = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

app.use('/posts', authorise, postroutes)
app.use('/user', userroutes)

mongoose.connect(connection_url)
.then(() => {
  app.get('/', (req, res) => {
    res.send('Welcome');
  });
  
      
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
  
