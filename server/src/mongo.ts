import { Db, MongoClient } from "mongodb";

const url = "";
const client = new MongoClient(url);

export async function ConnectMongoDb(databaseName: string): Promise<Db> {
  try {
    await client.connect();
    const database = await client.db(databaseName);
    return database;
  } catch {
    throw new Error(`Failed to connect to ${databaseName}`);
  }
}