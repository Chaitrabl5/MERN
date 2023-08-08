import asyncHandler from 'express-async-handler'
import Product from '../model/productModel.js'

const getProducts = asyncHandler(async (req,res)=>{

    const products = await Product.find({})
    res.status(200).json(products)
})

export {
    getProducts
}