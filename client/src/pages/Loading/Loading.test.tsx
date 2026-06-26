import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
    it('renders the loader data-testid', () => {
        render(<Loading />);
        expect(screen.getByTestId('loader')).toBeDefined();
    });
});
