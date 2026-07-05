import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect,it } from 'vitest';

import { BlogContentType } from '../../../models/enums/BlogContentType';
import { BlogContent, BlogItem, TextContent } from '../../../models/objects/BlogItem';
import DisplayBlogArticleContentComponent from './DisplayBlogArticleContentComponent';

const mockContent: BlogContent[] = [
    { type: BlogContentType.text, content: 'Hello world' } as TextContent,
    { type: BlogContentType.text, content: 'Second block' } as TextContent,
];

const mockBlogItem: BlogItem = {
    _id: 'abc123',
    title: 'My Blog Post',
    createdDate: '2024-06-15',
    primaryImage: 'cover.jpg',
    shortDescription: 'Short desc',
    tags: ['React'],
    content: mockContent,
};

function customRender(blogItem: BlogItem = mockBlogItem) {
    return render(
        <MemoryRouter>
            <DisplayBlogArticleContentComponent blogItem={blogItem} />
        </MemoryRouter>
    );
}

describe('DisplayBlogArticleContentComponent', () => {
    it('renders the blog title', () => {
        customRender();

        expect(screen.getByText('My Blog Post')).toBeInTheDocument();
    });

    it('renders the formatted date', () => {
        customRender();

        expect(screen.getByText('June 2024')).toBeInTheDocument();
    });

    it('renders a back link to the blogs page', () => {
        customRender();

        expect(screen.getByRole('link', { name: /back to blogs/i })).toHaveAttribute('href', '/blog');
    });

    it('renders a content block for each content item', () => {
        customRender();

        expect(screen.getAllByTestId('content-block')).toHaveLength(2);
    });

    it('renders no content blocks when content is empty', () => {
        customRender({ ...mockBlogItem, content: [] });

        expect(screen.queryByTestId('content-block')).not.toBeInTheDocument();
    });
});
