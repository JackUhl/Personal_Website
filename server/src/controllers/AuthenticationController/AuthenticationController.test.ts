import { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
    AuthenticationCallback,
    AuthenticationLogout,
    GetAuthenticationStatus,
} from "./AuthenticationController";

type SessionLike = {
    regenerate: (callback: (error?: Error | null) => void) => void;
    destroy: (callback: (error?: Error | null) => void) => void;
};

type MockRequest = Pick<Request, "session">;
type MockResponse = Pick<Response, "status" | "send" | "json" | "redirect" | "clearCookie">;

const createMockResponse = (): MockResponse => {
    const response: MockResponse = {
        status: vi.fn(),
        send: vi.fn(),
        json: vi.fn(),
        redirect: vi.fn(),
        clearCookie: vi.fn(),
    };

    (response.status as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.send as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.json as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.redirect as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);

    return response;
};

describe("AuthenticationController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubEnv("GOOGLE_REDIRECT_URL", "http://localhost:5173");
        vi.stubEnv("GOOGLE_ADMIN_ID", "admin-123");
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    describe("AuthenticationCallback", () => {
        it("redirects without regenerating or replacing Passport's session", () => {
            const session = {
                passport: { user: "admin-123" },
                regenerate: vi.fn((callback) => callback(null)),
                destroy: vi.fn(),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            AuthenticationCallback(req as Request, res as Response);

            expect(session.regenerate).not.toHaveBeenCalled();
            expect(req.session).toBe(session);
            expect(session.passport.user).toBe("admin-123");
            expect(session).not.toHaveProperty("isAdmin");
            expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173");
        });
    });

    describe("GetAuthenticationStatus", () => {
        it.each([
            { name: "the authenticated admin", user: "admin-123", authenticated: true, adminId: "admin-123", admin: true },
            { name: "a different account", user: "not-admin", authenticated: true, adminId: "admin-123", admin: false },
            { name: "an unauthenticated matching id", user: "admin-123", authenticated: false, adminId: "admin-123", admin: false },
            { name: "a legacy session without a Passport identity", user: undefined, authenticated: false, adminId: "admin-123", admin: false },
            { name: "missing admin configuration", user: undefined, authenticated: true, adminId: undefined, admin: false },
            { name: "empty admin configuration", user: "", authenticated: true, adminId: "", admin: false },
        ])("reports admin=$admin for $name", async ({ user, authenticated, adminId, admin }) => {
            vi.stubEnv("GOOGLE_ADMIN_ID", adminId);
            const req = {
                user,
                isAuthenticated: vi.fn(() => authenticated),
                session: { isAdmin: true },
            } as unknown as Request;
            const res = createMockResponse();

            await GetAuthenticationStatus(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ admin });
        });
    });

    describe("AuthenticationLogout", () => {
        it("clears cookie and redirects when session is destroyed", async () => {
            const session: SessionLike = {
                regenerate: vi.fn(),
                destroy: vi.fn((callback) => callback(null)),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            await AuthenticationLogout(req as Request, res as Response);

            expect(session.destroy).toHaveBeenCalledTimes(1);
            expect(res.clearCookie).toHaveBeenCalledWith("connect.sid");
            expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173");
        });

        it("clears cookie and returns 500 when destroy fails", async () => {
            const session: SessionLike = {
                regenerate: vi.fn(),
                destroy: vi.fn((callback) => callback(new Error("destroy failed"))),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            await AuthenticationLogout(req as Request, res as Response);

            expect(res.clearCookie).toHaveBeenCalledWith("connect.sid");
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.redirect).not.toHaveBeenCalled();
        });
    });
});
