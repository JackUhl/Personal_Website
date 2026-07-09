import { Request, Response } from "express";
import { beforeEach,describe, expect, it, vi } from "vitest";

import {
    AuthenticationCallback,
    AuthenticationLogout,
    GetAuthenticationStatus,
} from "./AuthenticationController";

type SessionLike = {
    isAdmin?: boolean;
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
        process.env.GOOGLE_REDIRECT_URL = "http://localhost:5173";
    });

    describe("AuthenticationCallback", () => {
        it("regenerates session, sets isAdmin, and redirects", () => {
            const session: SessionLike = {
                regenerate: vi.fn((callback) => callback(null)),
                destroy: vi.fn(),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            AuthenticationCallback(req as Request, res as Response);

            expect(session.regenerate).toHaveBeenCalledTimes(1);
            expect(req.session.isAdmin).toBe(true);
            expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173");
        });

        it("returns 500 when regenerate fails", () => {
            const session: SessionLike = {
                regenerate: vi.fn((callback) => callback(new Error("regenerate failed"))),
                destroy: vi.fn(),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            AuthenticationCallback(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.redirect).not.toHaveBeenCalled();
        });
    });

    describe("GetAuthenticationStatus", () => {
        it("returns admin true when session is admin", async () => {
            const session: SessionLike = {
                isAdmin: true,
                regenerate: vi.fn(),
                destroy: vi.fn(),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            await GetAuthenticationStatus(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ admin: true });
        });

        it("returns admin false when session is not admin", async () => {
            const session: SessionLike = {
                regenerate: vi.fn(),
                destroy: vi.fn(),
            };
            const req = { session } as unknown as MockRequest;
            const res = createMockResponse();

            await GetAuthenticationStatus(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ admin: false });
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
