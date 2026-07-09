import { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { EnsureAuthenticated } from "./AuthenticationMiddleware";

describe("EnsureAuthenticated", () => {
    it("returns 401 when the user is not an admin", () => {
        const req = {
            session: { isAdmin: false },
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

    it("calls next when the user is an admin", () => {
        const req = {
            session: { isAdmin: true },
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
