import { afterEach, describe, expect, it, vi } from "vitest";
import mongoose from "mongoose";
import { GetMongoUrl } from "../../helpers/MongoHelper/MongoHelper";
import { CreateMongooseClient } from "./MongooseClientFactory";

vi.mock("mongoose", () => {
    return {
        default: {
            createConnection: vi.fn(),
        },
    };
});

vi.mock("../../helpers/MongoHelper/MongoHelper", () => {
    return {
        GetMongoUrl: vi.fn(),
    };
});


describe("CreateMongooseClient", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    
    it("returns the mongoose connection and logs success", async () => {
        const databaseName = "personal_website";
        const fakeConnection = { id: "conn-1" };

        vi.mocked(GetMongoUrl).mockReturnValue("mongodb://localhost:27017/personal_website");
        vi.mocked(mongoose.createConnection).mockReturnValue({
            asPromise: vi.fn().mockResolvedValue(fakeConnection),
        } as never);

        const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

        const result = await CreateMongooseClient(databaseName);

        expect(GetMongoUrl).toHaveBeenCalledWith(databaseName);
        expect(mongoose.createConnection).toHaveBeenCalledWith("mongodb://localhost:27017/personal_website");
        expect(result).toBe(fakeConnection);
        expect(logSpy).toHaveBeenCalledWith("Successfully connected to personal_website database");
    });

    it("throws a descriptive error when connection fails", async () => {
        const databaseName = "personal_website";

        vi.mocked(GetMongoUrl).mockReturnValue("mongodb://localhost:27017/personal_website");
        vi.mocked(mongoose.createConnection).mockReturnValue({
            asPromise: vi.fn().mockRejectedValue(new Error("connection failed")),
        } as never);

        await expect(CreateMongooseClient(databaseName)).rejects.toThrow("Failed to connect to personal_website");
    });
});
