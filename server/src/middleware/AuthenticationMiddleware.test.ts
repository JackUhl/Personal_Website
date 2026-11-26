import { NextFunction, Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EnsureAuthenticated } from "./AuthenticationMiddleware";

describe("EnsureAuthenticated", () => {
    beforeEach(() => {
        vi.stubEnv("GOOGLE_ADMIN_ID", "admin-123");
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it.each([
        { name: "an anonymous request with a legacy admin flag", user: undefined, authenticated: false },
        { name: "an authenticated non-admin", user: "not-admin", authenticated: true },
        { name: "an unauthenticated matching id", user: "admin-123", authenticated: false },
        { name: "an authenticated request without an identity", user: undefined, authenticated: true },
    ])("returns 401 for $name", ({ user, authenticated }) => {
        const req = {
            user,
            isAuthenticated: vi.fn(() => authenticated),
            session: { isAdmin: true },
        } as unknown as Request;

        const send = vi.fn();
        const res = {
            status: vi.fn().mockReturnValue({ send }),
        } as unknown as Response;

        const next: NextFunction = vi.fn();

        EnsureAuthenticated(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(send).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();
    });

    it.each([undefined, "", "different-admin"])("denies access when GOOGLE_ADMIN_ID is %s", (adminId) => {
        vi.stubEnv("GOOGLE_ADMIN_ID", adminId);

        const req = {
            user: "admin-123",
            isAuthenticated: vi.fn(() => true),
        } as unknown as Request;

        const send = vi.fn();
        const res = {
            status: vi.fn().mockReturnValue({ send }),
        } as unknown as Response;
        const next: NextFunction = vi.fn();

        EnsureAuthenticated(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it("calls next when Passport authenticates the configured admin", () => {
        const req = {
            user: "admin-123",
            isAuthenticated: vi.fn(() => true),
        } as unknown as Request;

        const res = {
            status: vi.fn(),
            send: vi.fn(),
        } as unknown as Response;

        const next: NextFunction = vi.fn();

        EnsureAuthenticated(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });
});
