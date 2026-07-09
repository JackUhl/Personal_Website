import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { LoadingState } from '../../models/enums/LoadingState';
import { BlogItem } from '../../models/objects/BlogItem';
import BlogArticle from './BlogArticle';

const { mockUseFetch, mockUseIsMobile, mockPutBlog } = vi.hoisted(() => ({
    mockUseFetch: vi.fn(),
    mockUseIsMobile: vi.fn(() => false),
    mockPutBlog: vi.fn(),
}));

vi.mock('../../hooks/useFetch/useFetch', () => ({ useFetch: mockUseFetch }));
vi.mock('../../hooks/useIsMobile/useIsMobile', () => ({ useIsMobile: mockUseIsMobile }));
vi.mock('../../hooks/useHeatbeat/useHeartbeat', () => ({ useHeartbeat: vi.fn() }));

vi.mock('../../services/BlogService/BlogService', () => ({
    BlogService: {
        GetBlog: vi.fn(),
        PutBlog: mockPutBlog,
    },
}));

vi.mock('../../components/RevealComponent/RevealComponent', () => ({
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('./DisplayBlogArticleContentComponent/DisplayBlogArticleContentComponent', () => ({
    default: () => <div data-testid="display-blog-article" />,
}));

vi.mock('../../components/BlogArticleFormComponent/BlogArticleFormComponent', () => ({
    default: () => <div data-testid="blog-article-form" />,
}));

const mockBlogItem: BlogItem = {
    _id: 'abc123',
    title: 'My Blog Post',
    createdDate: '2024-01-01',
    primaryImage: 'cover.jpg',
    shortDescription: 'A short description',
    tags: ['React'],
    content: [],
};

function customRender(isAdmin = false) {
    return render(
        <MemoryRouter initialEntries={['/blog/abc123']}>
            <Routes>
                <Route
                    path="/blog/:id"
                    element={
                        <AuthenticationContext.Provider value={isAdmin}>
                            <BlogArticle />
                        </AuthenticationContext.Provider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
}

describe('BlogArticle', () => {
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
            mockUseFetch.mockReturnValue({ response: mockBlogItem, loadingState: LoadingState.success });
        });

        it('does not show the edit button for non-admin users', () => {
            customRender(false);

            expect(screen.queryByText('Edit Blog Article')).not.toBeInTheDocument();
        });

        it('shows the edit button for admin users', () => {
            customRender(true);

            expect(screen.getByText('Edit Blog Article')).toBeInTheDocument();
        });

        it('shows Cancel and Save buttons in edit mode', async () => {
            customRender(true);

            await userEvent.click(screen.getByText('Edit Blog Article'));

            expect(screen.getByText('Cancel')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
        });

        it('exits edit mode and restores display components when Cancel is clicked', async () => {
            customRender(true);

            await userEvent.click(screen.getByText('Edit Blog Article'));
            await userEvent.click(screen.getByText('Cancel'));

            expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        });

        it('calls PutBlog and exits edit mode on successful save', async () => {
            mockPutBlog.mockResolvedValueOnce({ data: mockBlogItem });
            customRender(true);

            await userEvent.click(screen.getByText('Edit Blog Article'));
            await userEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(mockPutBlog).toHaveBeenCalledWith('abc123', expect.not.objectContaining({ _id: 'abc123' }));
                expect(screen.queryByText('Save')).not.toBeInTheDocument();
            });
        });

        it('shows an error message when PutBlog fails', async () => {
            mockPutBlog.mockRejectedValueOnce(new Error('server error'));
            customRender(true);

            await userEvent.click(screen.getByText('Edit Blog Article'));
            await userEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(screen.getByText('Error editing blog post')).toBeInTheDocument();
            });
        });
    });
});
