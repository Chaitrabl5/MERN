
import connectDB from './config/mongodbconfig.js'



import express from 'express'

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorMiddleware.js'

import path from 'path'
    connectDB()
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser())
    

    app.use('/api/users',userRoutes)
    app.use('/api/products',productRoutes)
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname,'/frontend/dist')))
    app.get('*',(req,res) => 
    res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
    )
    app.use(errorHandler)
    app.listen(8000,()=> console.log('server started'))

//     try{
//    //const user =await userDao.registerUser("pradeep4","pradeep4@gmail.com","pass1234")
//    const user =await userDao.login("pradeep4@gmail.com","pass1234567")
// console.log(`user logged  ${user.email} in succesfully`)    
// }catch(error){
// console.error(`error ${error.message}`)
//     }
