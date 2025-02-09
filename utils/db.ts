// utils/db.ts
import mongoose from 'mongoose';

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 30000, // ⏳ Increase timeout (default is 10s)
      socketTimeoutMS: 45000, // ⏳ Increase socket timeout
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};
