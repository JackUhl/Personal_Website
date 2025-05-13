import { Db, MongoClient } from "mongodb";

const url = process.env.MONGO_URL as string;
const client = new MongoClient(url);

export async function ConnectMongoDb(databaseName: string): Promise<Db> {
  try {
    const database = await client.db(databaseName);

    console.log(`Successfully connected to ${databaseName} database`);

    return database;
  } catch {
    throw new Error(`Failed to connect to ${databaseName}`);
  }
}