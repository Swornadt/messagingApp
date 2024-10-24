import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const databaseConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DB connected");
    }).catch((error) => {
        console.log("Not connected!!!!!!!!!!!!!!!!",error);
    })
};

export default databaseConnection