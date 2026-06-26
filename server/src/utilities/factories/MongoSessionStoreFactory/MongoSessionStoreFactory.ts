import MongoStore from "connect-mongo";
import { GetMongoUrl } from "../../helpers/MongoHelper/MongoHelper";

export function CreateMongoSessionStore(databaseName: string, collectionName: string): MongoStore {
    return MongoStore.create({
        mongoUrl: GetMongoUrl(databaseName),
        collectionName,
        ttl: 3600,
    });
}