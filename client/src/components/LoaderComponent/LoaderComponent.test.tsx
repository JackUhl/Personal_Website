import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LoaderComponent from './LoaderComponent';

vi.mock('../RevealComponent/RevealComponent', () => ({
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('LoaderComponent', () => {
    it('renders the loader testid', () => {
        render(<LoaderComponent />);
        expect(screen.getByTestId('loader')).toBeDefined();
    });

    it('renders three circles', async () => {
        render(<LoaderComponent />);
        const circles = await screen.findAllByTestId('loader-circle');
        expect(circles.length).toBe(3);
    });
});
