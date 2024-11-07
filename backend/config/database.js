import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const databaseConnection = async () => {
    mongoose.set('debug', true);
    console.log("Connecting to MongoDB at:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connected");
    }).catch((error) => {
        console.log("Not connected!!!!!!!!!!!!!!!!",error);
    })
};

export default databaseConnection