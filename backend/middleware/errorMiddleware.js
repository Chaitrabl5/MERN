const errorHandler = (err,req,res,next) =>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    // If Unable to connect to db
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Problems with the Server'
    }
    res.status(statusCode).json({
        message: message,
        stack: err.stack
    })
}

export {errorHandler}