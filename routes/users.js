import express from "express";
import {signup, logout, signin, googlesignin} from '../controllers/usersC.js'

const Router = express.Router()

Router.patch('/signup', signup)
Router.delete('/logout', logout)
Router.patch('/signin', signin)
Router.patch('/googlesignin', googlesignin)

export default Router