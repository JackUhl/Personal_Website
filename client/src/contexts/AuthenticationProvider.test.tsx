import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { AuthenticationProvider } from './AuthenticationProvider';
import { AuthenticationContext } from './AuthenticationContext';

const { mockUseFetch, mockGetAuthenticationStatus } = vi.hoisted(() => ({
    mockUseFetch: vi.fn(),
    mockGetAuthenticationStatus: vi.fn(),
}));

vi.mock('../hooks/useFetch/useFetch', () => ({ useFetch: mockUseFetch }));
vi.mock('../services/AuthenticationService/AuthenticationService', () => ({
    AuthenticationService: { GetAuthenticationStatus: mockGetAuthenticationStatus },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthenticationProvider>{children}</AuthenticationProvider>
);

describe('AuthenticationProvider', () => {
    beforeEach(() => {
        mockGetAuthenticationStatus.mockReturnValue(Promise.resolve());
    });

    it('provides false by default when response has no admin flag', () => {
        mockUseFetch.mockReturnValue({ response: undefined });
        const { result } = renderHook(() => useContext(AuthenticationContext), { wrapper });
        expect(result.current).toBe(false);
    });

    it('provides true when response contains admin: true', async () => {
        mockUseFetch.mockReturnValue({ response: { admin: true } });
        const { result } = renderHook(() => useContext(AuthenticationContext), { wrapper });
        await waitFor(() => {
            expect(result.current).toBe(true);
        });
    });

    it('provides false when response contains admin: false', async () => {
        mockUseFetch.mockReturnValue({ response: { admin: false } });
        const { result } = renderHook(() => useContext(AuthenticationContext), { wrapper });
        await waitFor(() => {
            expect(result.current).toBe(false);
        });
    });
});
