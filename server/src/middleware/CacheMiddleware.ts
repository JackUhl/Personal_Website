import { NextFunction, Request, Response } from "express";
import { GetCacheKey } from "../helpers/CacheHelper";

export const CacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let cacheKey = req.originalUrl;
    let cachedValue = GetCacheKey(cacheKey);

    if(cachedValue) {
        console.log("Successfully fetched resume data from cached value");
        res.json(cachedValue);
    }
    else {
        next();
    }
};