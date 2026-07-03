import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import DisplayTitleContentComponent from './DisplayTitleContentComponent';

const renderComponent = (title: string) =>
    render(
        <MemoryRouter>
            <DisplayTitleContentComponent title={title} />
        </MemoryRouter>
    );

describe('DisplayTitleContentComponent', () => {
    beforeEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
        });
    });

    it('renders the title text', () => {
        renderComponent('My Section');

        expect(screen.getByText('My Section')).toBeInTheDocument();
    });

    it('sets the correct id on the title element', () => {
        renderComponent('My Section Title');

        expect(screen.getByText('My Section Title').id).toBe('my_section_title');
    });

    it('does not show the link icon when not hovering', () => {
        renderComponent('My Section');

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('shows the link icon when hovering over the container', async () => {
        renderComponent('My Section');

        await userEvent.hover(screen.getByText('My Section').parentElement!);

        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('hides the link icon when the cursor leaves the container', async () => {
        renderComponent('My Section');

        const container = screen.getByText('My Section').parentElement!;
        await userEvent.hover(container);
        await userEvent.unhover(container);

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('copies the url with the anchor hash to clipboard on title click', async () => {
        renderComponent('My Section');

        await userEvent.click(screen.getByText('My Section'));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            expect.stringContaining('#my_section')
        );
    });
});
