const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connection Successful")
    }catch(error ){
        console.log('Database Connections Fail', error.message)
        throw error;
    }
}
module.exports = connectDB;
