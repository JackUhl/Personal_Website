import { NextFunction, Request, Response } from "express";

export const EnsureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.isAdmin) {
        return res.status(401).send();
    }
    next();
};