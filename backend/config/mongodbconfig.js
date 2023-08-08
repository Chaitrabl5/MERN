import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const conn = await mongoose.connect('mongodb+srv://blchaitra:chaitra@cluster0.p8uvq4j.mongodb.net/mern?retryWrites=true&w=majority')
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
    }

}
export default connectDB