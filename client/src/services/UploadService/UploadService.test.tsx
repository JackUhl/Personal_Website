import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosResponse } from "axios";
import { UploadService } from "./UploadService";
import { UploadApiRoute } from "../../models/constants/RouteConstants";
import { AxiosLongTimeoutInMs } from "../../models/constants/ConfigurationConstants";

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

const baseUrl = `${import.meta.env.VITE_API_URL}${UploadApiRoute}`;

describe('UploadService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GetFile', () => {
        it('returns the correct URL for a given key', () => {
            const result = UploadService.GetFile('my-image.png');

            expect(result).toBe(`${baseUrl}/my-image.png`);
        });

        it('returns different URLs for different keys', () => {
            expect(UploadService.GetFile('file-a.png')).toBe(`${baseUrl}/file-a.png`);
            expect(UploadService.GetFile('file-b.pdf')).toBe(`${baseUrl}/file-b.pdf`);
        });
    });

    describe('PostUpload', () => {
        it('calls the correct URL with the correct timeout and content-type header', async () => {
            mockedAxios.post.mockResolvedValueOnce(createResponse('uploaded-key.png'));

            const file = new File(['content'], 'test.png', { type: 'image/png' });
            await UploadService.PostUpload(file);

            expect(mockedAxios.post).toHaveBeenCalledWith(
                baseUrl,
                expect.any(FormData),
                { timeout: AxiosLongTimeoutInMs, headers: { "Content-Type": "multipart/form-data" } }
            );
        });

        it('appends the file to FormData under the "file" key', async () => {
            mockedAxios.post.mockResolvedValueOnce(createResponse('uploaded-key.png'));

            const file = new File(['content'], 'test.png', { type: 'image/png' });
            await UploadService.PostUpload(file);

            const [, formData] = mockedAxios.post.mock.calls[0];
            expect((formData as FormData).get('file')).toBe(file);
        });

        it('returns the uploaded file key', async () => {
            mockedAxios.post.mockResolvedValueOnce(createResponse('uploaded-key.png'));

            const file = new File(['content'], 'test.png', { type: 'image/png' });
            const response = await UploadService.PostUpload(file);

            expect(response.data).toBe('uploaded-key.png');
        });

        it('propagates errors from axios', async () => {
            mockedAxios.post.mockRejectedValueOnce(new Error('upload failed'));

            const file = new File(['content'], 'test.png', { type: 'image/png' });

            await expect(UploadService.PostUpload(file)).rejects.toThrow('upload failed');
        });
    });
});
