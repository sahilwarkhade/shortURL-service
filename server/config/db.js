const mongoose = require("mongoose");


exports.connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("DB CONNECTED")
      } catch (err) {
        console.log("ERROR: ",err)
        console.log("ERROR IN CONNECTION OF DB")
      }
}
