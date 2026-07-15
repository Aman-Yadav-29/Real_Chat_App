import mongoose from 'mongoose';

// Function to connect to MongoDB using Mongoose
export const connectDB = async () => {
    try {
        mongoose.connection.on(`connected`, () => console.log('DATABASE CONNECTED'));
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}