import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RemovableEditFormItem from './RemovableEditFormItem';

describe('RemovableEditFormItem', () => {
    it('renders the remove button', () => {
        render(<RemovableEditFormItem onClick={vi.fn()} />);
        expect(screen.getByTestId('remove-item-button')).toBeDefined();
    });

    it('renders children', () => {
        render(
            <RemovableEditFormItem onClick={vi.fn()}>
                <span>child content</span>
            </RemovableEditFormItem>
        );
        expect(screen.getByText('child content')).toBeDefined();
    });

    it('calls onClick when the remove button is clicked', async () => {
        const onClick = vi.fn();
        render(<RemovableEditFormItem onClick={onClick} />);
        await userEvent.click(screen.getByTestId('remove-item-button'));
        expect(onClick).toHaveBeenCalledOnce();
    });
});
