import { act,renderHook } from '@testing-library/react';
import { afterEach,beforeEach, describe, expect, it, vi } from 'vitest';

import { HeartbeatIntervalInMs } from '../../models/constants/ConfigurationConstants';
import { AuthenticationService } from '../../services/AuthenticationService/AuthenticationService';
import { useHeartbeat } from './useHeartbeat';

describe('useHeartbeat', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(AuthenticationService, 'GetAuthenticationStatus').mockResolvedValue(
            {} as Awaited<ReturnType<typeof AuthenticationService.GetAuthenticationStatus>>
        );
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('does not poll when disabled', () => {
        renderHook(() => useHeartbeat(false));

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs * 3);
        });

        expect(AuthenticationService.GetAuthenticationStatus).not.toHaveBeenCalled();
    });

    it('polls on each interval when enabled', () => {
        renderHook(() => useHeartbeat(true));

        expect(AuthenticationService.GetAuthenticationStatus).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs);
        });
        expect(AuthenticationService.GetAuthenticationStatus).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs);
        });
        expect(AuthenticationService.GetAuthenticationStatus).toHaveBeenCalledTimes(2);
    });

    it('stops polling after unmount', () => {
        const { unmount } = renderHook(() => useHeartbeat(true));

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs);
        });
        expect(AuthenticationService.GetAuthenticationStatus).toHaveBeenCalledTimes(1);

        unmount();

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs);
        });
        expect(AuthenticationService.GetAuthenticationStatus).toHaveBeenCalledTimes(1);
    });

    it('stops polling when re-rendered as disabled', () => {
        const { rerender } = renderHook(({ enabled }) => useHeartbeat(enabled), {
            initialProps: { enabled: true },
        });

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs);
        });
        expect(AuthenticationService.GetAuthenticationStatus).toHaveBeenCalledTimes(1);

        rerender({ enabled: false });

        act(() => {
            vi.advanceTimersByTime(HeartbeatIntervalInMs);
        });
        expect(AuthenticationService.GetAuthenticationStatus).toHaveBeenCalledTimes(1);
    });
});
