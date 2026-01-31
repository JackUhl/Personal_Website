import { Request, Response } from "express";

declare module "express-session" {
    interface SessionData {
        isAdmin?: boolean;
    }
}

export const AuthenticationCallback = (req: Request, res: Response) => {
    req.session.regenerate((error) => {
        if (error) {
            return res.status(500).send();
        }

        const isAdmin = req.user == process.env.GOOGLE_ADMIN_ID as string;

        req.session.isAdmin = isAdmin;

        res.redirect(process.env.GOOGLE_REDIRECT_URL as string);
    });
}

export const GetAuthenticationStatus = async (req: Request, res: Response) => {
    res.status(200).json({
        admin: req.session.isAdmin ?? false
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