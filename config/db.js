const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("database connected")
        
    } catch (error) {
        console.log("db connection faild",error)
        process.exit(1)
    }
}

module.exports=connectDB