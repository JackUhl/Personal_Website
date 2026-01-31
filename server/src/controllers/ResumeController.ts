import { Request, Response } from "express";
import { HandleGetResume, HandlePutResume } from "../handlers/ResumeHandler";

export const GetResume = async (req: Request, res: Response) => {
    try {
        const result = await HandleGetResume();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const PutResume = async (req: Request, res: Response) => {
    try {
        const result = await HandlePutResume(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}