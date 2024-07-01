const crypto = require('crypto');

function  otpGenerator(){
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}

function createSuccess(data)
{
    return {
        status: 'success',
        data
    }
}


function createError(error){
    return{
        status :"error",
        error: error
    }
}

module.exports = {
    createError, createSuccess, otpGenerator
}