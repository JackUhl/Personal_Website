import { Request, Response } from "express";
import { HandleGetResume, HandlePutResume } from "../handlers/ResumeHandler";
import { ResumeRequestValidator } from "./validators/ResumeValidators";

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
        const { error, value } = ResumeRequestValidator.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details });
        }

        const result = await HandlePutResume(value);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}