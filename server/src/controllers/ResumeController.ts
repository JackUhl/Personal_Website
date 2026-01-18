import { Request, Response } from "express";
import { HandleGetResume } from "../handlers/ResumeHandler";

export const GetResume = async (req: Request, res: Response) => {
    try {
        const result = await HandleGetResume(req);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}