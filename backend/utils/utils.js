function createSuccess(data)
{
    return {
        status: 'Success',
        data
    }
}


function createError(error){
    return{
        status :"Error",
        error: error
    }
}

module.exports = {
    createError, createSuccess
}