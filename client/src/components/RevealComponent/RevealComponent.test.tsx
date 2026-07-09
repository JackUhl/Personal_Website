import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RevealComponent from './RevealComponent';

describe('RevealComponent', () => {
    it('renders all children', () => {
        render(
            <RevealComponent>
                <span>one</span>
                <span>two</span>
                <span>three</span>
            </RevealComponent>
        );
        expect(screen.getByText('one')).toBeDefined();
        expect(screen.getByText('two')).toBeDefined();
        expect(screen.getByText('three')).toBeDefined();
    });

    it('shows all children immediately when noReveal is true', () => {
        const { container } = render(
            <RevealComponent noReveal>
                <span>one</span>
                <span>two</span>
            </RevealComponent>
        );
        const items = container.querySelectorAll('[class*="revealItemShown"]');
        expect(items.length).toBe(2);
    });

    it('reveals children progressively over time', async () => {
        vi.useFakeTimers();
        const { container } = render(
            <RevealComponent timeoutInterval={100}>
                <span>one</span>
                <span>two</span>
            </RevealComponent>
        );

        // Initially no items shown
        expect(container.querySelectorAll('[class*="revealItemShown"]').length).toBe(0);

        // Advance enough time for the first child to be revealed (100ms)
        await vi.advanceTimersByTimeAsync(100);

        expect(container.querySelectorAll('[class*="revealItemShown"]').length).toBe(1);

        // Advance enough time for the remaining children to be revealed (another 100ms)
        await vi.advanceTimersByTimeAsync(100);

        expect(container.querySelectorAll('[class*="revealItemShown"]').length).toBe(2);

        vi.useRealTimers();
    });

    it('resets and repeats when repeat is true', async () => {
        vi.useFakeTimers();
        const { container } = render(
            <RevealComponent timeoutInterval={100} repeat>
                <span>one</span>
                <span>two</span>
            </RevealComponent>
        );

        // Advance to fully reveal all children (2 * 100ms)
        await vi.advanceTimersByTimeAsync(250);
        expect(container.querySelectorAll('[class*="revealItemShown"]').length).toBe(2);

        // Advance one more tick to trigger the repeat reset
        await vi.advanceTimersByTimeAsync(100);
        // After repeating, revealIndex resets to -1 so items go back to hidden
        expect(container.querySelectorAll('[class*="revealItemShown"]').length).toBe(0);

        vi.useRealTimers();
    });
});
