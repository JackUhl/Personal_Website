import { describe, it, expect } from 'vitest';
import { renderFullDate, renderPartialDate } from './DateRenderer';

describe('renderPartialDate', () => {
    it('renders the full month name and year', () => {
        const date = new Date(2025, 0, 15);

        expect(renderPartialDate(date)).toBe('January 2025');
    });

    it('handles a different month and year', () => {
        const date = new Date(2023, 11, 1);

        expect(renderPartialDate(date)).toBe('December 2023');
    });
});

describe('renderFullDate', () => {
    it('renders the full month name, day and year', () => {
        const date = new Date(2025, 0, 15);

        expect(renderFullDate(date)).toBe('January 15 2025');
    });

    it('handles a different month, day and year', () => {
        const date = new Date(2023, 11, 1);

        expect(renderFullDate(date)).toBe('December 1 2023');
    });
});
