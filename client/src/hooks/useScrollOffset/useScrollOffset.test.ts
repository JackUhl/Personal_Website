import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollOffset } from './useScrollOffset';

const originalScrollY = window.scrollY;

function setScrollY(offset: number) {
    Object.defineProperty(window, 'scrollY', {
        configurable: true,
        writable: true,
        value: offset,
    });
}

function scrollTo(offset: number) {
    act(() => {
        setScrollY(offset);
        window.dispatchEvent(new Event('scroll'));
    });
}

describe('useScrollOffset', () => {
    afterEach(() => {
        setScrollY(originalScrollY);
    });

    it('returns 0 as the initial scroll offset', () => {
        const { result } = renderHook(() => useScrollOffset());

        expect(result.current).toBe(0);
    });

    it('updates the offset when the window is scrolled', () => {
        const { result } = renderHook(() => useScrollOffset());

        scrollTo(250);

        expect(result.current).toBe(250);
    });

    it('reflects the latest offset after multiple scroll events', () => {
        const { result } = renderHook(() => useScrollOffset());

        scrollTo(100);
        expect(result.current).toBe(100);

        scrollTo(420);
        expect(result.current).toBe(420);
    });

    it('removes the scroll listener on unmount', () => {
        const { result, unmount } = renderHook(() => useScrollOffset());

        scrollTo(150);
        expect(result.current).toBe(150);

        unmount();

        scrollTo(900);
        expect(result.current).toBe(150);
    });
});
