const CustomErrorApi = require("./customApiError");
const {StatusCodes} = require('http-status-codes');

class BadRequestError extends CustomErrorApi{
    constructor(message){
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError;