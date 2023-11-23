class CustomErrorApi extends Error{
    constructor(message){
        super(message);
    }
}

module.exports = CustomErrorApi;