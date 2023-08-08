import jwt from 'jsonwebtoken'
const generateToken = (res,userId) => {
    const token = jwt.sign({userId},'password',{
    expiresIn:'30d'
})
    res.cookie('jwt',token,{
        httpOnly: true,
        secure: true,
        sameState: 'strict',
        maxAge: 30*24*60*60*1000
 })
}

export default generateToken