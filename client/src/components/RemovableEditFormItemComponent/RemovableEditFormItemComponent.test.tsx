import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import RemovableEditFormItemComponent from './RemovableEditFormItemComponent';

describe('RemovableEditFormItem', () => {
    it('renders the remove button', () => {
        render(<RemovableEditFormItemComponent onClick={vi.fn()} />);
        expect(screen.getByTestId('remove-item-button')).toBeDefined();
    });

    it('renders children', () => {
        render(
            <RemovableEditFormItemComponent onClick={vi.fn()}>
                <span>child content</span>
            </RemovableEditFormItemComponent>
        );
        expect(screen.getByText('child content')).toBeDefined();
    });

    it('calls onClick when the remove button is clicked', async () => {
        const onClick = vi.fn();
        render(<RemovableEditFormItemComponent onClick={onClick} />);
        await userEvent.click(screen.getByTestId('remove-item-button'));
        expect(onClick).toHaveBeenCalledOnce();
    });
});
