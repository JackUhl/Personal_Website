import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmationButtonComponent from './ConfirmationButtonComponent';

const customRender = (onClick?: () => void) => {
    render(
        <ConfirmationButtonComponent onClick={onClick ?? vi.fn()}>
            <span>Delete</span>
        </ConfirmationButtonComponent>
    );
}

describe('ConfirmationButtonComponent', () => {
    it('renders the initial button at first', () => {
        customRender();

        expect(screen.getByTestId('initial-button')).toBeInTheDocument();
        expect(screen.queryByTestId('confirm-button')).not.toBeInTheDocument();
    });

    it('shows the confirm and initial buttons after click', async () => {
        customRender();

        await userEvent.click(screen.getByTestId('initial-button'));

        expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
        expect(screen.queryByTestId('initial-button')).not.toBeInTheDocument();
    });

    it('calls onClick when the confirm button is clicked', async () => {
        const onClick = vi.fn();
        customRender(onClick);

        await userEvent.click(screen.getByTestId('initial-button'));
        await userEvent.click(screen.getByTestId('confirm-button'));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('returns to the trigger button when the cancel button is clicked', async () => {
        customRender();

        await userEvent.click(screen.getByTestId('initial-button'));
        await userEvent.click(screen.getByTestId('cancel-button'));

        expect(screen.getByTestId('initial-button')).toBeInTheDocument();
        expect(screen.queryByTestId('confirm-button')).not.toBeInTheDocument();
    });

    it('does not call onClick when the cancel button is clicked', async () => {
        const onClick = vi.fn();
        customRender(onClick);

        await userEvent.click(screen.getByTestId('initial-button'));
        await userEvent.click(screen.getByTestId('cancel-button'));

        expect(onClick).not.toHaveBeenCalled();
    });
});
