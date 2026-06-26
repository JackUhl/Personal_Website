import { describe, expect, it, vi } from "vitest";
import { GetMongoUrl } from "./MongoHelper";

describe("GetMongoUrl", () => {
    it("builds a full Mongo URL using the base env var and database name", () => {
        vi.stubEnv("MONGO_URL", "mongodb://localhost:27017/");

        const result = GetMongoUrl("personal_website");

        expect(result).toBe("mongodb://localhost:27017/personal_website");
    });
});
