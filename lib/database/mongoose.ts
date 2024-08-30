import mongoose, { Mongoose } from "mongoose";

const uri = process.env.MONGODB_URI;

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectToDatabase(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!uri) throw new Error("Please define the MONGODB_URI environment variable inside .env)");

    cached.promise = cached.promise || mongoose.connect(uri, { bufferCommands: false});

    cached.conn = await cached.promise;
    return cached.conn;
}
