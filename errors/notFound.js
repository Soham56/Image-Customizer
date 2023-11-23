const CustomErrorApi = require("./customApiError");
const {StatusCodes} = require('http-status-codes');

class NotFoundError extends CustomErrorApi{
    constructor(message){
        super(message);
        this.status = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;