import mongoose from "mongoose";
import { DB_NAME} from "../constants.js";


const connectDB = async () => {
try{

  const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  console.log(`MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);

}catch(error){
    // console.error("Error connecting to the database:", error);
    // throw error; // Rethrow the error to be handled by the caller   
    console.log("ERRR: ", error);
    process.exit(1); // Exit the process with an error code
}
}

export default connectDB;