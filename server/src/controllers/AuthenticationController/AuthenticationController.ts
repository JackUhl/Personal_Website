import { Request, Response } from "express";

import { IsAdmin } from "../../middleware/AuthenticationMiddleware";

export const AuthenticationCallback = (req: Request, res: Response) => {
    res.redirect(process.env.GOOGLE_REDIRECT_URL as string);
}

export const GetAuthenticationStatus = async (req: Request, res: Response) => {
    res.status(200).json({
        admin: IsAdmin(req)
    });
}

export const AuthenticationLogout = async (req: Request, res: Response) => {
    req.session.destroy((error) => {
        res.clearCookie("connect.sid");

        if (error) {
            return res.status(500).send();
        }

        res.redirect(process.env.GOOGLE_REDIRECT_URL as string);
    });
}