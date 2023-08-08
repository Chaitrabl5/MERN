import User from "../model/userModel.js";
class UserDao {

   async registerUser(name,email,password){
    
    const user = User.create({name,email,password})
    if(user){
        return user
    }
    else{
        throw new Error('Invalid User data')
    }
    }

    async login(email,password){
        const user = await  User.findOne({email})
        if(user && (await user.matchPassword(password))){
            return user
        }
        else {
            throw new Error("Inavlid email or password")
        }

    } 

}
export default new UserDao()