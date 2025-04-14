import jwt from 'jsonwebtoken'

export const authorise = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        req.userid = null
        next()
    }
    else{
    const user = jwt.verify(token, process.env.secret)
    req.userid = user.userid
    //console.log(user);
    next()
    }
}