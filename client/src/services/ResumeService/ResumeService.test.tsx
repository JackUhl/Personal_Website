import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosResponse } from "axios";
import { ResumeService } from "./ResumeService";
import { ResumeApiRoute } from "../../models/constants/RouteConstants";
import { AxiosTimeoutInMs } from "../../models/constants/ConfigurationConstants";
import { ResumeItems } from "../../models/objects/ResumeItems";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

function createResponse<T>(data: T): AxiosResponse<T> {
    return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse<T>['config'],
    };
}

const baseUrl = `${import.meta.env.VITE_API_URL}${ResumeApiRoute}`;

const mockResumeItems: ResumeItems = {
    workExperiences: [],
    educationExperiences: [],
    technicalSkills: [],
    resumeDocument: { data: "" },
};

describe('ResumeService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GetResume', () => {
        it('calls the correct URL with the correct timeout', async () => {
            mockedAxios.get.mockResolvedValueOnce(createResponse(mockResumeItems));

            await ResumeService.GetResume();

            expect(mockedAxios.get).toHaveBeenCalledWith(baseUrl, { timeout: AxiosTimeoutInMs });
        });

        it('returns the resume items', async () => {
            mockedAxios.get.mockResolvedValueOnce(createResponse(mockResumeItems));

            const response = await ResumeService.GetResume();

            expect(response.data).toEqual(mockResumeItems);
        });

        it('propagates errors from axios', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('network error'));

            await expect(ResumeService.GetResume()).rejects.toThrow('network error');
        });
    });

    describe('PutResume', () => {
        it('calls the correct URL with the correct body and timeout', async () => {
            mockedAxios.put.mockResolvedValueOnce(createResponse(mockResumeItems));

            await ResumeService.PutResume(mockResumeItems);

            expect(mockedAxios.put).toHaveBeenCalledWith(baseUrl, mockResumeItems, { timeout: AxiosTimeoutInMs });
        });

        it('returns the updated resume items', async () => {
            mockedAxios.put.mockResolvedValueOnce(createResponse(mockResumeItems));

            const response = await ResumeService.PutResume(mockResumeItems);

            expect(response.data).toEqual(mockResumeItems);
        });

        it('propagates errors from axios', async () => {
            mockedAxios.put.mockRejectedValueOnce(new Error('server error'));

            await expect(ResumeService.PutResume(mockResumeItems)).rejects.toThrow('server error');
        });
    });
});
