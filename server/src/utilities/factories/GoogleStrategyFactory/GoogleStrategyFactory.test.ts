import { afterEach, describe, expect, it, vi } from "vitest";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CreateGoogleStrategy } from "./GoogleStrategyFactory";

vi.mock("passport-google-oauth20", () => {
    return {
        Strategy: vi.fn().mockImplementation(function MockStrategy(options, verify) {
            return {
                options,
                verify,
            };
        }),
    };
});

describe("CreateGoogleStrategy", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    it("builds the strategy with env-backed config", () => {
        vi.stubEnv("GOOGLE_CLIENT_ID", "client-id");
        vi.stubEnv("GOOGLE_CLIENT_SECRET", "client-secret");
        vi.stubEnv("GOOGLE_REDIRECT_URL", "https://example.com");
        vi.stubEnv("GOOGLE_ADMIN_ID", "admin-123");

        CreateGoogleStrategy();

        const strategyMock = vi.mocked(GoogleStrategy);
        expect(strategyMock).toHaveBeenCalledTimes(1);

        const strategyOptions = strategyMock.mock.calls[0][0] as {
            clientID: string;
            clientSecret: string;
            callbackURL: string;
        };

        expect(strategyOptions.clientID).toBe("client-id");
        expect(strategyOptions.clientSecret).toBe("client-secret");
        expect(strategyOptions.callbackURL).toBe("https://example.com/api/auth/callback");
    });

    it("authenticates only the configured admin id", () => {
        vi.stubEnv("GOOGLE_CLIENT_ID", "client-id");
        vi.stubEnv("GOOGLE_CLIENT_SECRET", "client-secret");
        vi.stubEnv("GOOGLE_REDIRECT_URL", "https://example.com");
        vi.stubEnv("GOOGLE_ADMIN_ID", "admin-123");

        CreateGoogleStrategy();

        const strategyMock = vi.mocked(GoogleStrategy);
        const verify = strategyMock.mock.calls[0][1] as unknown as (
            accessToken: string,
            refreshToken: string,
            profile: { id: string },
            done: (error: unknown, user?: false | string) => void,
        ) => void;

        const doneUnauthorized = vi.fn();
        verify("access", "refresh", { id: "not-admin" }, doneUnauthorized);
        expect(doneUnauthorized).toHaveBeenCalledWith(null, false);

        const doneAuthorized = vi.fn();
        verify("access", "refresh", { id: "admin-123" }, doneAuthorized);
        expect(doneAuthorized).toHaveBeenCalledWith(null, "admin-123");
    });
});
