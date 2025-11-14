import "dotenv/config";
import mongoose from "mongoose";

const connectDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database");
  }catch(err){
    console.log("Failed to Connect with Db",err);
  }
};

export default connectDb;