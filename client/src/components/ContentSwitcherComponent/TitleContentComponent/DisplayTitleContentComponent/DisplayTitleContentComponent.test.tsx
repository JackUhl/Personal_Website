import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import checkmarkSvg from '../../../../assets/svg/checkmark.svg';
import linkSvg from '../../../../assets/svg/link.svg';
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

    it('shows a checkmark icon after clicking the title while hovering', async () => {
        renderComponent('My Section');

        const title = screen.getByText('My Section');
        const container = title.parentElement!;

        await userEvent.hover(container);
        expect(screen.getByRole('img')).toHaveAttribute('src', linkSvg);

        await userEvent.click(title);
        expect(screen.getByRole('img')).toHaveAttribute('src', checkmarkSvg);
    });

    it('hides the link icon when the cursor leaves the container', async () => {
        renderComponent('My Section');

        const container = screen.getByText('My Section').parentElement!;
        await userEvent.hover(container);
        await userEvent.unhover(container);

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
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
