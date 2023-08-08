import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const productSchema = mongoose.Schema(
    {
productName:{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true
},
starRating:{
    type: Number,
    required: true
},
productId:{
    type: Number,
    required: true,
    unique: true
},
productCode:{
    type: Number,
    required: true,
    unique: true
},
productAvailable:{
    type: String,
    required: true,
    unique: true
},
imageUrl:{
    type: String,
    required: true,
    unique: true
},
    },
{
timestamps: true
}
    
)

const Product = mongoose.model('Product',productSchema)
export default Product