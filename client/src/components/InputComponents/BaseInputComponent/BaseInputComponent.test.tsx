import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BaseInputComponent from './BaseInputComponent';

describe('BaseInputComponent', () => {
    it('renders label when provided', () => {
        render(
            <BaseInputComponent
                label="Field Label"
                inputElement={<input data-testid="child-input" />}
            />
        );

        expect(screen.getByText('Field Label')).toBeInTheDocument();
    });

    it('renders inputElement passed through props', () => {
        render(
            <BaseInputComponent
                label="Name"
                inputElement={<textarea data-testid="child-textarea" />}
            />
        );

        const element = screen.getByTestId('child-textarea');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('TEXTAREA');
    });
});
