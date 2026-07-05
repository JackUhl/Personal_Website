import { act,renderHook } from '@testing-library/react';
import { afterEach,describe, expect, it } from 'vitest';

import { useIsMobile } from './useIsMobile';

const originalInnerWidth = window.innerWidth;

function setInnerWidth(width: number) {
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: width,
    });
}

function resizeTo(width: number) {
    act(() => {
        setInnerWidth(width);
        window.dispatchEvent(new Event('resize'));
    });
}

describe('useIsMobile', () => {
    afterEach(() => {
        setInnerWidth(originalInnerWidth);
    });

    it('returns true when the initial width is at or below the mobile threshold', () => {
        setInnerWidth(600);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
    });

    it('returns false when the initial width is above the mobile threshold', () => {
        setInnerWidth(601);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
    });

    it('updates to true when the window is resized to a mobile width', () => {
        setInnerWidth(1024);

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        resizeTo(500);

        expect(result.current).toBe(true);
    });

    it('updates to false when the window is resized to a desktop width', () => {
        setInnerWidth(500);

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);

        resizeTo(1024);

        expect(result.current).toBe(false);
    });

    it('removes the resize listener on unmount', () => {
        setInnerWidth(1024);

        const { result, unmount } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        unmount();

        resizeTo(500);

        expect(result.current).toBe(false);
    });
});
