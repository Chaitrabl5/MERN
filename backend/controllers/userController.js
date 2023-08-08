import userDao from "../dao/userDao.js";
import asyncHandler  from 'express-async-handler' 
import generateToken from '..//util/generateToken.js'
import User from "../model/userModel.js";
const authenticateUser = asyncHandler(async (req,res)=>{
   
const {email,password} = req.body
const user = await userDao.login(email,password)
if(user){
    generateToken(res,user._id)
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email
    })
}else{
    res.status(401)
    throw new Error('Invalid Email Or Password')
}

})

// Register a new user

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body
    const userExists = await  User.findOne({email})
    if(userExists){
        throw new Error('User with email already exists')
    }
    const user = await userDao.registerUser(name,email,password)
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const logoutUser = (req,res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message:'Logged out Successfully'})
}

const getUserProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    
    if(user){
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('User Data Not Found')
    }
})

const updateUserProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('User Data Not Found')
    }
})

export {
    authenticateUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}