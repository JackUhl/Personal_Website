import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorComponent from './ErrorComponent';

describe('ErrorComponent', () => {
    it('renders the error text', () => {
        render(<ErrorComponent errorText="Something went wrong" />);
        expect(screen.getByText('Something went wrong')).toBeDefined();
    });

    it('renders the error dialog', () => {
        render(<ErrorComponent errorText="An error occurred" />);
        expect(screen.getByTestId('error')).toBeDefined();
    });
});
