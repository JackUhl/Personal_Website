import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import { useFetch } from './useFetch';
import { LoadingState } from '../../models/enums/LoadingState';

function createResponse<T>(data: T): AxiosResponse<T> {
    return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse<T>['config'],
    };
}

describe('useFetch', () => {
    it('starts in the loading state with no response', () => {
        const serviceCall = new Promise<AxiosResponse<string>>(() => {});

        const { result } = renderHook(() => useFetch(serviceCall));

        expect(result.current.loadingState).toBe(LoadingState.loading);
        expect(result.current.response).toBeUndefined();
    });

    it('sets the response and success state when the call resolves', async () => {
        const data = { message: 'hello' };
        const serviceCall = Promise.resolve(createResponse(data));

        const { result } = renderHook(() => useFetch(serviceCall));

        await waitFor(() => {
            expect(result.current.loadingState).toBe(LoadingState.success);
        });

        expect(result.current.response).toEqual(data);
    });

    it('sets the failed state and leaves the response undefined when the call rejects', async () => {
        const serviceCall = Promise.reject(new Error('network error'));

        const { result } = renderHook(() => useFetch(serviceCall));

        await waitFor(() => {
            expect(result.current.loadingState).toBe(LoadingState.failed);
        });

        expect(result.current.response).toBeUndefined();
    });
});
