require("dotenv").config() 
const mongoose = require('mongoose');
module.exports.connect= async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("KẾT NỐI THÀNH CÔNG")
    } catch (error) {
        console.log("KẾT NỐI THẤT BẠI")
    }
}