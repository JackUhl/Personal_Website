import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Failed from './Failed';

describe('Failed', () => {
    it('renders the error data-testid', () => {
        render(<Failed />);
        expect(screen.getByTestId('error')).toBeDefined();
    });
});
