import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const databaseConnection = async () => {
    console.log("Connecting to MongoDB at:", process.env.MONGO_URI);
    mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DB connected");
    }).catch((error) => {
        console.log("Not connected!!!!!!!!!!!!!!!!",error);
        console.log("Connecting to MongoDB at:", process.env.MONGO_URI);
    })
};

export default databaseConnection