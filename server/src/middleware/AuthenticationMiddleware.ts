import { NextFunction, Request, Response } from "express";
import { jwtCookieName } from "../constants/CookieConstants";
import jwt from 'jsonwebtoken';
import { isAuthorized } from "../helpers/authentication/AuthenticationHelper";

export const SetUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[jwtCookieName];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = decoded.id;
  } catch {
    req.user = undefined;
  } finally {
    next();
  }
};

export const EnsureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user as string;

    if(isAuthorized(id)) {
      next();
    }
  } catch {
    res.status(401).send();
  }
};