import { Request, Response } from "express";
import passport from 'passport';

export const GetGoogleAuth = async (req: Request, res: Response) => {
    return passport.authenticate('google', { scope: ['email'] })
}

export const GetGoogleAuthCallback = async (req: Request, res: Response) => {
    return passport.authenticate('google', { failureRedirect: '/error', successRedirect: '/' })
}