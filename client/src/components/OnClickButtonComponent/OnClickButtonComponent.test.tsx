import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import OnClickButtonComponent from './OnClickButtonComponent';
import { disabled } from './OnClickButtonComponent.module.css';

describe('OnClickButtonComponent', () => {
    it('renders its children', () => {
        render(<OnClickButtonComponent onClick={() => { }}>Click me</OnClickButtonComponent>);

        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('shows loader component while submitting instead of children', () => {
        render(
            <OnClickButtonComponent onClick={() => { }} isSubmitting>
                Click me
            </OnClickButtonComponent>,
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        expect(screen.getByText('Click me')).toBeInTheDocument();
        expect(screen.getByText('Click me')).not.toBeVisible();
    });

    it('applies disabled styling when isDisabled is true', () => {
        render(
            <OnClickButtonComponent onClick={() => { }} isDisabled>
                Click me
            </OnClickButtonComponent>,
        );

        expect(screen.getByText('Click me').closest('div')).toHaveClass(disabled);
    });

    it('calls onClick when clicked', async () => {
        const onClick = vi.fn();
        render(<OnClickButtonComponent onClick={onClick}>Click me</OnClickButtonComponent>);

        await userEvent.click(screen.getByText('Click me'));

        expect(onClick).toHaveBeenCalledOnce();
    });
});
