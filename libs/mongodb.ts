// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined');
}

interface MongooseGlobal extends globalThis.Global {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: MongooseGlobal;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 30000, // ⏳ Increase timeout (default is 10s)
      socketTimeoutMS: 45000, // ⏳ Increase socket timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
