export default (err,req,res,next)=>{

    let error ={
        message : err.message || 'Internal server error',
        statusCode : err.statusCode || 500
    }

    if(process.env.NODE_ENV == 'DEVELOPMENT'){
        res.status(error.statusCode).json({
            message : error.message,
            error: err
        })
    }
    res.status(error.statusCode).json({
        message : error.message,
        error: err
    })
}