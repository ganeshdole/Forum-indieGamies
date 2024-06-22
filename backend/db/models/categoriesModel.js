const req = require('express/lib/request')
const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
        unique : true

    },
    description :{
        type : String, 
        required : true,
        trim : true 
    },
    icon :{
        type : String,
        required : true,
        trim : true
    }

})

const categoriesModel = new mongoose.model('categories', categoriesSchema)

module.exports = categoriesModel