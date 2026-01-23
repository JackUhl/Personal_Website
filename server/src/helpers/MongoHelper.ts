import mongoose, { Connection } from "mongoose";

const url = process.env.MONGO_URL as string;

export async function CreateMongooseClient(databaseName: string): Promise<Connection> {
  try {
    const client = await mongoose.createConnection(`${url}${databaseName}`).asPromise()
    console.log(`Successfully connected to ${databaseName} database`);
    return client;
  } catch {
    throw new Error(`Failed to connect to ${databaseName}`);
  }
}