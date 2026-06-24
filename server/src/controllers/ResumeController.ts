import { Request, Response } from "express";
import { ResumeRequestValidator } from "./validators/ResumeValidators";
import { ResumeHandler } from "../handlers/ResumeHandler/ResumeHandler";
import { ResumeRequest } from "../models/data/ResumeModels";

type ResumeControllerDependencies = Pick<ResumeHandler, "HandleGetResume" | "HandlePutResume">;

export const CreateResumeController = (dependencies: ResumeControllerDependencies) => {
    const GetResume = async (req: Request, res: Response) => {
        try {
            const result = await dependencies.HandleGetResume();

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    const PutResume = async (req: Request<Record<string, never>, unknown, ResumeRequest>, res: Response) => {
        try {
            const { error, value } = ResumeRequestValidator.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details });
            }

            const result = await dependencies.HandlePutResume(value);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    return {
        GetResume,
        PutResume,
    };
}