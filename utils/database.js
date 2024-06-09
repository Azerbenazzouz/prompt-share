import mongoose from 'mongoose';

let isConnected = false; // Database connection status

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB connection succeeded');
    }catch(err) {
        console.error('MongoDB connection failed:', err);
    }
}