import { Request } from "express";
import { SetCacheKey } from "../helpers/CacheHelper";
import { GetResume } from "../repositories/ResumeRepository";

export const HandleGetResume = async (req: Request) => {
    try {
        const result = await GetResume();
        SetCacheKey(req.originalUrl, result);
        return result;
    } catch (error) {
        throw error;
    }
}