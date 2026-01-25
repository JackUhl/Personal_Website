import { NextFunction, Request, Response } from "express";

export const EnsureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.isAdmin) {
        res.status(403).send();
    }
    next();
};