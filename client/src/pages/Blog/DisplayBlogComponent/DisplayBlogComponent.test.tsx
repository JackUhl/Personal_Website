import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { BlogItem } from '../../../models/objects/BlogItem';
import DisplayBlogComponent from './DisplayBlogComponent';

vi.mock('../../../components/RevealComponent/RevealComponent', () => ({
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockBlogs: BlogItem[] = [
    { _id: '1', title: 'Post One', createdDate: '2024-01-01', primaryImage: 'img1.jpg', shortDescription: 'Desc 1', tags: ['React'], content: [] },
    { _id: '2', title: 'Post Two', createdDate: '2024-02-01', primaryImage: 'img2.jpg', shortDescription: 'Desc 2', tags: ['TypeScript'], content: [] },
    { _id: '3', title: 'Post Three', createdDate: '2024-03-01', primaryImage: 'img3.jpg', shortDescription: 'Desc 3', tags: ['React'], content: [] },
];

function customRender(isAdmin = false, deleteBlog = vi.fn()) {
    return render(
        <MemoryRouter>
            <AuthenticationContext.Provider value={isAdmin}>
                <DisplayBlogComponent allBlogs={mockBlogs} deleteBlog={deleteBlog} />
            </AuthenticationContext.Provider>
        </MemoryRouter>
    );
}

describe('DisplayBlogComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a card for each blog item', () => {
        customRender();

        expect(screen.getAllByTestId('blog-card')).toHaveLength(3);
        expect(screen.getByText('Post One')).toBeInTheDocument();
        expect(screen.getByText('Post Two')).toBeInTheDocument();
        expect(screen.getByText('Post Three')).toBeInTheDocument();
    });

    it('filters cards to only those matching the selected tag', async () => {
        customRender();

        await userEvent.click(screen.getByText('TypeScript'));

        expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
        expect(screen.getByText('Post Two')).toBeInTheDocument();
        expect(screen.queryByText('Post One')).not.toBeInTheDocument();
        expect(screen.queryByText('Post Three')).not.toBeInTheDocument();
    });

    it('shows all cards again when the selected tag is deselected', async () => {
        customRender();

        await userEvent.click(screen.getByText('React'));
        await userEvent.click(screen.getByText('React'));

        expect(screen.getAllByTestId('blog-card')).toHaveLength(3);
    });

    it('does not show delete buttons for non-admin users', () => {
        customRender(false);

        expect(screen.queryByTestId('initial-button')).not.toBeInTheDocument();
    });

    it('shows a delete button per blog card for admin users', () => {
        customRender(true);

        expect(screen.getAllByTestId('initial-button')).toHaveLength(3);
    });

    it('calls deleteBlog with the correct id after confirming deletion', async () => {
        const deleteBlog = vi.fn();
        customRender(true, deleteBlog);

        const deleteButtons = screen.getAllByTestId('initial-button');
        await userEvent.click(deleteButtons[0]);
        await userEvent.click(screen.getByTestId('confirm-button'));

        expect(deleteBlog).toHaveBeenCalledWith('1');
    });
});
