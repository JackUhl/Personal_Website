import { NextFunction, Request, Response } from "express";

export const IsAdmin = (req: Request): boolean => {
    const adminId = process.env.GOOGLE_ADMIN_ID;
    return Boolean(adminId) && req.isAuthenticated() && req.user === adminId;
};

export const EnsureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!IsAdmin(req)) {
        return res.status(401).send();
    }
    next();
};