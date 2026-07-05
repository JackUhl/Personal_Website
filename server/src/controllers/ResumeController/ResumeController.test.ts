import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResumeRequest } from "../../models/data/ResumeModels";
import { CreateResumeController } from "./ResumeController";
import { ResumeRequestValidator } from "./ResumeValidators";

type MockResponse = Pick<Response, "status" | "send" | "json">;

const createMockResponse = (): MockResponse => {
    const response: MockResponse = {
        status: vi.fn(),
        send: vi.fn(),
        json: vi.fn(),
    };

    (response.status as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.send as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.json as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);

    return response;
};

const createResumeRequest = (): ResumeRequest => ({
    workExperiences: [
        {
            mainText: "Company A",
            subText: "Software Engineer",
            position: "Full-time",
            start: new Date("2022-01-01T00:00:00.000Z"),
            end: new Date("2023-01-01T00:00:00.000Z"),
            description: ["Built APIs"],
        },
    ],
    educationExperiences: [
        {
            mainText: "University A",
            subText: "Computer Science",
            start: new Date("2018-01-01T00:00:00.000Z"),
            end: new Date("2022-01-01T00:00:00.000Z"),
            description: ["Graduated"],
        },
    ],
    technicalSkills: [
        {
            name: "TypeScript",
            icon: "typescript.svg",
        },
    ],
    resumeDocument: {
        data: "base64-resume",
    },
});

describe("CreateResumeController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GetResume", () => {
        it("returns 200 with resume data", async () => {
            const resume = {
                workExperiences: [],
                educationExperiences: [],
                technicalSkills: [],
                resumeDocument: null,
            };

            const dependencies = {
                HandleGetResume: vi.fn().mockResolvedValue(resume),
                HandlePutResume: vi.fn(),
            };

            const controller = CreateResumeController(dependencies);
            const req = {} as Request;
            const res = createMockResponse();

            await controller.GetResume(req, res as Response);

            expect(dependencies.HandleGetResume).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(resume);
        });

        it("returns 500 when handler throws", async () => {
            const dependencies = {
                HandleGetResume: vi.fn().mockRejectedValue(new Error("failed")),
                HandlePutResume: vi.fn(),
            };

            const controller = CreateResumeController(dependencies);
            const req = {} as Request;
            const res = createMockResponse();

            await controller.GetResume(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });

    describe("PutResume", () => {
        it("returns 400 when validator fails", async () => {
            const requestBody = createResumeRequest();
            vi.spyOn(ResumeRequestValidator, "validate").mockReturnValue({
                error: {
                    details: [
                        {
                            message: "invalid payload",
                            path: ["workExperiences"],
                            type: "array.base",
                        },
                    ],
                },
                value: requestBody,
                warning: undefined,
            } as any);

            const dependencies = {
                HandleGetResume: vi.fn(),
                HandlePutResume: vi.fn(),
            };

            const controller = CreateResumeController(dependencies);
            const req = { body: requestBody } as Request<Record<string, never>, unknown, ResumeRequest>;
            const res = createMockResponse();

            await controller.PutResume(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: [
                    {
                        message: "invalid payload",
                        path: ["workExperiences"],
                        type: "array.base",
                    },
                ],
            });
            expect(dependencies.HandlePutResume).not.toHaveBeenCalled();
        });

        it("returns 200 and updated resume when validator passes", async () => {
            const requestBody = createResumeRequest();
            vi.spyOn(ResumeRequestValidator, "validate").mockReturnValue({
                error: undefined,
                value: requestBody,
                warning: undefined,
            });

            const updatedResume = {
                workExperiences: requestBody.workExperiences,
                educationExperiences: requestBody.educationExperiences,
                technicalSkills: requestBody.technicalSkills,
                resumeDocument: requestBody.resumeDocument,
            };

            const dependencies = {
                HandleGetResume: vi.fn(),
                HandlePutResume: vi.fn().mockResolvedValue(updatedResume),
            };

            const controller = CreateResumeController(dependencies);
            const req = { body: requestBody } as Request<Record<string, never>, unknown, ResumeRequest>;
            const res = createMockResponse();

            await controller.PutResume(req, res as Response);

            expect(dependencies.HandlePutResume).toHaveBeenCalledWith(requestBody);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedResume);
        });

        it("returns 500 when put handler throws", async () => {
            const requestBody = createResumeRequest();
            vi.spyOn(ResumeRequestValidator, "validate").mockReturnValue({
                error: undefined,
                value: requestBody,
                warning: undefined,
            });

            const dependencies = {
                HandleGetResume: vi.fn(),
                HandlePutResume: vi.fn().mockRejectedValue(new Error("save failed")),
            };

            const controller = CreateResumeController(dependencies);
            const req = { body: requestBody } as Request<Record<string, never>, unknown, ResumeRequest>;
            const res = createMockResponse();

            await controller.PutResume(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });
});
