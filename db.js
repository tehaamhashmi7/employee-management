const mongoose = require('mongoose');
const env = require('dotenv')
env.config();

//CREATE CONNECTION
const connectDatabase = async function () {
    mongoose.connect(process.env.URI, function(err){
        if(err){
            console.log(err.message)
        } else {
            console.log('Connected to mongoose')
        }
    })
}

module.exports = connectDatabase