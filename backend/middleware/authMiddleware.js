import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const protect = asyncHandler(async (req,res,next)=>{

let token
token = req.cookies.jwt

if(token){
try {
const decoded = jwt.verify(token,'password')
req.user = await User.findById(decoded.userId).select('-password')
next()

} catch (error) {
console.error(error)
res.status(401)
throw new Error('Not Authorized')

}
} else {
res.status(401)
throw new Error('Not Authorized')
}

})

export {protect}