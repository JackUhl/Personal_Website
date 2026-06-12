import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { AuthenticationService } from "./AuthenticationService";
import { AuthenticationApiRoute } from "../../models/constants/RouteConstants";
import { AxiosTimeoutInMs } from "../../models/constants/ConfigurationConstants";
import { AuthenticationStatus } from "../../models/objects/AuthenticationStatus";
import { AxiosResponse } from "axios";

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

describe('AuthenticationService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('GetAuthenticationStatus calls the correct URL with the correct timeout', async () => {
        const status: AuthenticationStatus = { admin: true };
        mockedAxios.get.mockResolvedValueOnce(createResponse(status));

        await AuthenticationService.GetAuthenticationStatus();

        const expectedUrl = `${import.meta.env.VITE_API_URL}${AuthenticationApiRoute}`;
        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, { timeout: AxiosTimeoutInMs });
    });

    it('GetAuthenticationStatus returns the authentication status from the response', async () => {
        const status: AuthenticationStatus = { admin: true };
        mockedAxios.get.mockResolvedValueOnce(createResponse(status));

        const response = await AuthenticationService.GetAuthenticationStatus();

        expect(response.data).toEqual(status);
    });

    it('GetAuthenticationStatus returns admin false when not authenticated as admin', async () => {
        const status: AuthenticationStatus = { admin: false };
        mockedAxios.get.mockResolvedValueOnce(createResponse(status));

        const response = await AuthenticationService.GetAuthenticationStatus();

        expect(response.data).toEqual(status);
    });

    it('GetAuthenticationStatus propagates errors from axios', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('network error'));

        await expect(AuthenticationService.GetAuthenticationStatus()).rejects.toThrow('network error');
    });
});
