import users from "../models/usersmodel.js"; 
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {OAuth2Client} from 'google-auth-library' 
dotenv.config()


export const signup = async (req, res) => {
  
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new users({
      email,
      password,
      user: firstName + lastName, 
    });
    await newUser.save();
    const token = jwt.sign({
      email,
      password,
      user: firstName + lastName, 
      userid:newUser._id
    }, process.env.secret, {expiresIn:'1h'})
    res.status(201).cookie('token', token,{
      httpOnly: true, 
      secure: true, 
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    }).json({ user:newUser, message: 'Signup successful' });
  } catch (error) {
    //console.log(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly:true,
    secure:true,
    sameSite:'none'
  })
  res.json({message:'Logout Success'})
}

export const signin = async(req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({email:email})
  //console.log(user)
  if(!user) return res.status(400).json({message:'Email does not exist'})
  //console.log(user.password)
  if(password != user.password) return res.status(401).json({message:'Wrong password'})
    const token = jwt.sign({
      email,
      password,
      user:user.user,
      userid:user._id
    }, process.env.secret, {expiresIn:'1h'})
    //console.log(user)
  res.status(201).cookie('token', token, {
    httpOnly:true,
    secure:true,
    sameSite:'none',
    maxAge: 24 * 60 * 60 * 1000
  }).json(user)
}

export const googlesignin = async(req, res) => {
  const {token} = req.body
  const client = new OAuth2Client(process.env.CLIENT_ID)
  const ticket = await client.verifyIdToken({
    idToken:token,
    audience:process.env.CLIENT_ID
  })
  //console.log(ticket)
  const googleuser = ticket.getPayload();
  const user = await users.findOne({email:googleuser.email})
  if(!user) return res.status(400).json({message:'User not registered'})
  const jwttoken = jwt.sign({email:user.email, password:user.password, user:user.user, userid:user._id}, process.env.secret)
  //console.log(user)
  res.status(201).cookie('token', jwttoken, {
    httpOnly:true,
    secure:true,
    sameSite:'none',
    maxAge: 24 * 60 * 60 * 1000
  }).json(user)
}