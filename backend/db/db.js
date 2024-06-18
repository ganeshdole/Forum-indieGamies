const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/forumIndieGamies")
        console.log("Database Connection Successful")
    }catch(error ){
        console.log('Database Connections Fail', error.message)
    }
}
module.exports = connectDB;
