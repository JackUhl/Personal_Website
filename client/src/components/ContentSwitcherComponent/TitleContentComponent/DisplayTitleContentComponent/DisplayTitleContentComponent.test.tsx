import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

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

    it('removes special characters when generating the title id', () => {
        renderComponent('My Section: R&D Notes!');

        expect(screen.getByText('My Section: R&D Notes!').id).toBe('my_section_rd_notes');
    });

    it('copies the url with the anchor hash to clipboard on title click when no hash exists', async () => {
        renderComponent('My Section');
        window.history.replaceState({}, '', '/blog/article');

        await userEvent.click(screen.getByText('My Section'));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            `${window.location.origin}/blog/article#my_section`
        );
    });

    it('replaces the existing hash with the title hash when copying to clipboard', async () => {
        renderComponent('My Section');
        window.history.replaceState({}, '', '/blog/article#old_section');

        await userEvent.click(screen.getByText('My Section'));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            `${window.location.origin}/blog/article#my_section`
        );
    });
});
