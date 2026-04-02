import config from './config.js'
import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(config.MONGO_URI);
    console.log("Connected to database");
}

export default connectDB;