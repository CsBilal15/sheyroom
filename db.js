const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/hoteldb")
.then(()=>console.log("connection is successfull"))
.catch((err)=>console.log(err))
module.exports=mongoose;