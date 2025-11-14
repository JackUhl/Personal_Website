import { Db, MongoClient } from "mongodb";
import { BlogDatabase, ResumeDatabase } from "../models/constants/MongoConstants";

const url = process.env.MONGO_URL as string;
const client = new MongoClient(url);

let blogClient: Db;
let resumeClient: Db;

async function ConnectMongoDb(databaseName: string): Promise<Db> {
  try {
    await client.connect();
    const database = await client.db(databaseName);
    console.log(`Successfully connected to ${databaseName} database`);
    return database;
  } catch {
    throw new Error(`Failed to connect to ${databaseName}`);
  }
}

export const GetBlogClient = async () => {
  try {
    if (!blogClient) {
      blogClient = await ConnectMongoDb(BlogDatabase);
    }
    return blogClient;
  } catch (error) {
    throw error;
  }
}

export const GetResumeClient = async () => {
  try {
    if (!resumeClient) {
      resumeClient = await ConnectMongoDb(ResumeDatabase);
    }
    return resumeClient;
  } catch (error) {
    throw error;
  }
}