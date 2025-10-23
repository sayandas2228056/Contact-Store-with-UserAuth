const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected",
            connect.connection.host,
            connect.connection.name,
        );
    } catch (error) {
        console.log("MongoDB connection error",error);
    }
}

module.exports = connectDB;