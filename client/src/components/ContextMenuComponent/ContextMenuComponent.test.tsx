import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContextMenuComponent from './ContextMenuComponent';

describe('ContextMenuComponent', () => {
    it('opens the context menu when the trigger is clicked', () => {
        render(
            <ContextMenuComponent>
                <button type="button">Add content above</button>
            </ContextMenuComponent>
        );

        expect(screen.queryByRole('button', { name: 'Add content above' })).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId('more-options'));

        expect(screen.getByRole('button', { name: 'Add content above' })).toBeInTheDocument();
    });

    it('closes the context menu when a child action is clicked', () => {
        render(
            <ContextMenuComponent>
                <button type="button">Add content below</button>
            </ContextMenuComponent>
        );

        fireEvent.click(screen.getByTestId('more-options'));
        expect(screen.getByRole('button', { name: 'Add content below' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Add content below' }));

        expect(screen.queryByRole('button', { name: 'Add content below' })).not.toBeInTheDocument();
    });

    it('closes the context menu when a click occurs outside the component', () => {
        render(
            <>
                <button type="button">Outside</button>
                <ContextMenuComponent>
                    <button type="button">Add content above</button>
                </ContextMenuComponent>
            </>
        );

        fireEvent.click(screen.getByTestId('more-options'));
        expect(screen.getByRole('button', { name: 'Add content above' })).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));

        expect(screen.queryByRole('button', { name: 'Add content above' })).not.toBeInTheDocument();
    });
});
