import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Blog from './Blog';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { LoadingState } from '../../models/enums/LoadingState';
import { BlogItem } from '../../models/objects/BlogItem';

const { mockUseFetch, mockUseIsMobile, mockPostBlog, mockDeleteBlog } = vi.hoisted(() => ({
    mockUseFetch: vi.fn(),
    mockUseIsMobile: vi.fn(() => false),
    mockPostBlog: vi.fn(),
    mockDeleteBlog: vi.fn(),
}));

vi.mock('../../hooks/useFetch/useFetch', () => ({ useFetch: mockUseFetch }));
vi.mock('../../hooks/useIsMobile/useIsMobile', () => ({ useIsMobile: mockUseIsMobile }));
vi.mock('../../hooks/useHeatbeat/useHeartbeat', () => ({ useHeartbeat: vi.fn() }));
vi.mock('../../services/BlogService/BlogService', () => ({
    BlogService: {
        GetAllBlogs: vi.fn(),
        PostBlog: mockPostBlog,
        DeleteBlog: mockDeleteBlog,
    },
}));

const mockBlogItem: BlogItem = {
    _id: 'blog-1',
    title: 'Test Blog',
    createdDate: '2026-01-01',
    primaryImage: 'image.png',
    shortDescription: 'A test post',
    tags: ['test'],
    content: [],
};

function customRender(isAdmin = false) {
    return render(
        <MemoryRouter>
            <AuthenticationContext.Provider value={isAdmin}>
                <Blog />
            </AuthenticationContext.Provider>
        </MemoryRouter>
    );
}

describe('Blog', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseIsMobile.mockReturnValue(false);
    });

    describe('loading state', () => {
        it('renders the Loading component when fetching', () => {
            mockUseFetch.mockReturnValue({ response: undefined, loadingState: LoadingState.loading });

            customRender();

            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });

        it('renders the Failed component when the fetch fails', () => {
            mockUseFetch.mockReturnValue({ response: undefined, loadingState: LoadingState.failed });

            customRender();

            expect(screen.getByTestId('error')).toBeInTheDocument();
        });
    });

    describe('admin mode', () => {
        beforeEach(() => {
            mockUseFetch.mockReturnValue({ response: [mockBlogItem], loadingState: LoadingState.success });
        });

        it('does not show the Add Blog Post button for non-admin users', () => {
            customRender(false);

            expect(screen.queryByText('Add Blog Post')).not.toBeInTheDocument();
        });

        it('shows the Add Blog Post button for admin users', () => {
            customRender(true);

            expect(screen.getByText('Add Blog Post')).toBeInTheDocument();
        });

        it('shows Cancel and Save buttons in edit mode', async () => {
            customRender(true);

            await userEvent.click(screen.getByText('Add Blog Post'));

            expect(screen.getByText('Cancel')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
        });

        it('exits edit mode and shows the blog list when Cancel is clicked', async () => {
            customRender(true);

            await userEvent.click(screen.getByText('Add Blog Post'));
            await userEvent.click(screen.getByText('Cancel'));

            expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        });

        it('calls PostBlog and exits edit mode on successful save', async () => {
            mockPostBlog.mockResolvedValueOnce({ data: mockBlogItem });
            customRender(true);

            await userEvent.click(screen.getByText('Add Blog Post'));
            await userEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(mockPostBlog).toHaveBeenCalledOnce();
                expect(screen.queryByText('Save')).not.toBeInTheDocument();
            });
        });

        it('shows an error message when PostBlog fails', async () => {
            mockPostBlog.mockRejectedValueOnce(new Error('server error'));
            customRender(true);

            await userEvent.click(screen.getByText('Add Blog Post'));
            await userEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(screen.getByText('Error submitting blog post')).toBeInTheDocument();
            });
        });
    });
});
