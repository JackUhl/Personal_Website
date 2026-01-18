import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { jwtCookieName } from "../models/constants/CookieConstants";
import { isAuthorized } from "../helpers/AuthenticationHelper";
import { Token } from "../models/objects/AuthenticationStatus";

export const AuthenticationCallback = (req: Request, res: Response) => {
    const id = req.user as string;
      
    if (isAuthorized(id)) {
        const token: Token = {
            id: id
        }

        const cookie = jwt.sign(token, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.cookie(jwtCookieName, cookie, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000
        });
    }
    
    res.redirect(process.env.GOOGLE_REDIRECT_URL as string);
}

export const GetAuthenticationStatus = async (req: Request, res: Response) => {
    const id = req.user as string;

    res.json({
        admin: isAuthorized(id)
    });
}