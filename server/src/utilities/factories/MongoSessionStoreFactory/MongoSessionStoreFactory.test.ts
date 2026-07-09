import MongoStore from "connect-mongo";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GetMongoUrl } from "../../helpers/MongoHelper/MongoHelper";
import { CreateMongoSessionStore } from "./MongoSessionStoreFactory";

vi.mock("connect-mongo", () => {
    return {
        default: {
            create: vi.fn(),
        },
    };
});

vi.mock("../../helpers/MongoHelper/MongoHelper", () => {
    return {
        GetMongoUrl: vi.fn(),
    };
});

describe("CreateMongoSessionStore", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    
    it("creates a MongoStore with expected options", () => {
        const databaseName = "personal_website";
        const collectionName = "sessions";
        const fakeStore = { name: "store" };

        vi.mocked(GetMongoUrl).mockReturnValue("mongodb://localhost:27017/personal_website");
        vi.mocked(MongoStore.create).mockReturnValue(fakeStore as never);

        const result = CreateMongoSessionStore(databaseName, collectionName);

        expect(GetMongoUrl).toHaveBeenCalledWith(databaseName);
        expect(MongoStore.create).toHaveBeenCalledWith({
            mongoUrl: "mongodb://localhost:27017/personal_website",
            collectionName: "sessions",
            ttl: 3600,
        });
        expect(result).toBe(fakeStore);
    });
});
