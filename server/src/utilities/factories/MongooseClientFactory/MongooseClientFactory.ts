import mongoose, { Connection } from "mongoose";
import { GetMongoUrl } from "../../helpers/MongoHelper/MongoHelper";

export async function CreateMongooseClient(databaseName: string): Promise<Connection> {
    try {
        const client = await mongoose.createConnection(GetMongoUrl(databaseName)).asPromise();
        console.log(`Successfully connected to ${databaseName} database`);
        return client;
    } catch {
        throw new Error(`Failed to connect to ${databaseName}`);
    }
}