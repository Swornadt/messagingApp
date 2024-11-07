import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const databaseConnection = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("DB connected");
            break;
        } catch (error) {
            console.log(`Failed to connect to DB. Retries left: ${retries - 1}`);
            console.log(error);
            retries -= 1;
            await new Promise(res => setTimeout(res, delay));
        }
    }
    if (!retries) console.log("Could not connect to MongoDB after multiple attempts.");
};


export default databaseConnection