import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { jwtCookieName } from "../constants/CookieConstants";
import { isAuthorized } from "../helpers/authentication/AuthenticationHelper";

export const AuthenticationCallback = (req: Request, res: Response) => {
    const id = req.user as string;
      
    if (isAuthorized(id)) {
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.cookie(jwtCookieName, token, {
            httpOnly: true,
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