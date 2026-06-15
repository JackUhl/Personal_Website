import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BlogCardComponent from './BlogCardComponent';
import { BlogItem } from '../../../../models/objects/BlogItem';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal<typeof import('react-router-dom')>()),
    useNavigate: () => mockNavigate,
}));

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: (key: string) => `https://cdn.example.com/${key}`,
    },
}));

const mockBlog: BlogItem = {
    _id: 'abc123',
    title: 'My Blog Post',
    createdDate: '2024-01-15',
    primaryImage: 'cover.jpg',
    shortDescription: 'A short description',
    tags: ['React'],
    content: [],
};

const customRender = () => {
    render(
        <MemoryRouter>
            <BlogCardComponent blogItem={mockBlog} />
        </MemoryRouter>
    );
}

describe('BlogCardComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the blog title', () => {
        customRender();

        expect(screen.getByText('My Blog Post')).toBeInTheDocument();
    });

    it('renders the short description', () => {
        customRender();
        expect(screen.getByText('A short description')).toBeInTheDocument();
    });

    it('renders the image using the URL from UploadService', () => {
        customRender();

        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn.example.com/cover.jpg');
    });

    it('renders the formatted created date', () => {
        customRender();

        expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    it('navigates to the blog article page when clicked', async () => {
        customRender();

        await userEvent.click(screen.getByText('My Blog Post'));

        expect(mockNavigate).toHaveBeenCalledWith('/blog/abc123');
    });
});
