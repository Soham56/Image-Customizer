const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err,req,res,next)=>{
    const customError = {};
    customError.message = err.message || `Something Went Wrong, Try again later`;
    customError.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

    return res.status(customError.status).json({msg:customError.message});
}

module.exports = errorHandlerMiddleware;