import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { BlogItem } from '../../../../models/objects/BlogItem';
import FilterButtonsComponent from './FilterButtonsComponents';

const mockBlogs: BlogItem[] = [
    { _id: '1', title: 'Post One', createdDate: '2024-01-01', primaryImage: '', shortDescription: '', tags: ['React', 'TypeScript'], content: [] },
    { _id: '2', title: 'Post Two', createdDate: '2024-02-01', primaryImage: '', shortDescription: '', tags: ['TypeScript'], content: [] },
    { _id: '3', title: 'Post Three', createdDate: '2024-03-01', primaryImage: '', shortDescription: '', tags: ['CSS'], content: [] },
];

const mockSetSelectedBlogTags = vi.fn();

describe('FilterButtonsComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    });

    it('renders a button for each unique tag', () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={[]}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('CSS')).toBeInTheDocument();
    });

    it('does not render duplicate tags', () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={[]}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        expect(screen.getAllByText('TypeScript')).toHaveLength(1);
    });

    it('calls setSelectedBlogTags with the tag added when an unselected tag is clicked', async () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={[]}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        await userEvent.click(screen.getByText('React'));

        expect(mockSetSelectedBlogTags).toHaveBeenCalledWith(['React']);
    });

    it('calls setSelectedBlogTags with the tag removed when a selected tag is clicked', async () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={['React', 'TypeScript']}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        await userEvent.click(screen.getByText('React'));

        expect(mockSetSelectedBlogTags).toHaveBeenCalledWith(['TypeScript']);
    });

    it('does not show the Clear Filters button when no tags are selected', () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={[]}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
    });

    it('shows the Clear Filters button when at least one tag is selected', () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={['React']}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });

    it('calls setSelectedBlogTags with an empty array when Clear Filters is clicked', async () => {
        render(
            <FilterButtonsComponent
                allBlogs={mockBlogs}
                selectedBlogTags={['React', 'CSS']}
                setSelectedBlogTags={mockSetSelectedBlogTags}
            />
        );

        await userEvent.click(screen.getByText('Clear Filters'));

        expect(mockSetSelectedBlogTags).toHaveBeenCalledWith([]);
    });
});
