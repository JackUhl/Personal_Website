import { fireEvent,render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BlogContentType } from '../../models/enums/BlogContentType';
import { BlogItem, BlogItemKeys, defaultTextContent } from '../../models/objects/BlogItem';
import BlogArticleFormComponent from './BlogArticleFormComponent';

vi.mock('../../services/UploadService/UploadService', () => ({
    UploadService: { GetFile: (key: string) => `http://mocked/${key}`, PostUpload: vi.fn() },
}));

const makeBlogItem = (contentOverride: BlogItem['content'] = []): BlogItem => ({
    [BlogItemKeys._Id]: 'abc123',
    [BlogItemKeys.Title]: 'Test Title',
    [BlogItemKeys.CreatedDate]: '2024-01-01',
    [BlogItemKeys.PrimaryImage]: 'image.png',
    [BlogItemKeys.ShortDescription]: 'Short desc',
    [BlogItemKeys.Tags]: ['tag1'],
    [BlogItemKeys.Content]: contentOverride,
});

describe('BlogArticleFormComponent', () => {
    it('renders the edit form', () => {
        render(<BlogArticleFormComponent blogItem={makeBlogItem()} updateBlogItem={vi.fn()} />);
        expect(screen.getByTestId('edit-form')).toBeDefined();
    });

    it('calls updateBlogItem when edit form changes', () => {
        const updateBlogItem = vi.fn();
        render(<BlogArticleFormComponent blogItem={makeBlogItem()} updateBlogItem={updateBlogItem} />);
        fireEvent.change(screen.getByDisplayValue('Test Title'), { target: { value: 'Updated Title' } });
        expect(updateBlogItem).toHaveBeenCalledWith(expect.objectContaining({ title: 'Updated Title' }));
    });

    it('renders content items', () => {
        const blogItem = makeBlogItem([defaultTextContent, defaultTextContent]);
        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={vi.fn()} />);
        expect(screen.getAllByTestId('content-switcher').length).toBe(2);
    });

    it('renders the add content button', () => {
        render(<BlogArticleFormComponent blogItem={makeBlogItem()} updateBlogItem={vi.fn()} />);
        const addContentButton = screen.getByTestId('add-content-button');
        expect(addContentButton).toBeInTheDocument();
    });

    it('calls updateBlogItem with new text content when add button is clicked', () => {
        const updateBlogItem = vi.fn();
        render(<BlogArticleFormComponent blogItem={makeBlogItem()} updateBlogItem={updateBlogItem} />);
        const addContentButton = screen.getByTestId('add-content-button');
        fireEvent.click(addContentButton);
        expect(updateBlogItem).toHaveBeenCalledOnce();
        expect(updateBlogItem).toHaveBeenCalledWith(
            expect.objectContaining({
                content: [defaultTextContent],
            })
        );
    });

    it('calls updateBlogItem with item removed when remove button is clicked', () => {
        const updateBlogItem = vi.fn();
        const blogItem = makeBlogItem([defaultTextContent, defaultTextContent]);
        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={updateBlogItem} />);
        fireEvent.click(screen.getAllByTestId('remove-item-button')[0]);
        expect(updateBlogItem).toHaveBeenCalledOnce();
        const updated = updateBlogItem.mock.calls[0][0] as BlogItem;
        expect(updated.content.length).toBe(1);
    });

    it('does not render move buttons when there is only one content item', () => {
        render(<BlogArticleFormComponent blogItem={makeBlogItem([defaultTextContent])} updateBlogItem={vi.fn()} />);
        expect(screen.queryByTestId('up-arrow')).not.toBeInTheDocument();
        expect(screen.queryByTestId('down-arrow')).not.toBeInTheDocument();
    });

    it('renders move up and move down buttons when there are multiple content items', () => {
        render(<BlogArticleFormComponent blogItem={makeBlogItem([defaultTextContent, defaultTextContent])} updateBlogItem={vi.fn()} />);
        expect(screen.queryByTestId('up-arrow')).toBeInTheDocument();
        expect(screen.queryByTestId('down-arrow')).toBeInTheDocument();
    });

    it('calls updateBlogItem with items swapped when move down is clicked', () => {
        const updateBlogItem = vi.fn();
        const textContent = defaultTextContent;
        const mediaContent = { type: BlogContentType.media, media: 'media.mp4' } as BlogItem['content'][number];
        const blogItem = makeBlogItem([textContent, mediaContent]);
        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={updateBlogItem} />);
        fireEvent.click(screen.getAllByTestId('down-arrow')[0]);
        expect(updateBlogItem).toHaveBeenCalledOnce();
        const updated = updateBlogItem.mock.calls[0][0] as BlogItem;
        expect(updated.content[0]).toEqual(mediaContent);
        expect(updated.content[1]).toEqual(textContent);
    });

    it('calls updateBlogItem with items swapped when move up is clicked', () => {
        const updateBlogItem = vi.fn();
        const textContent = defaultTextContent;
        const mediaContent = { type: BlogContentType.media, media: 'media.mp4' } as BlogItem['content'][number];
        const blogItem = makeBlogItem([textContent, mediaContent]);
        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={updateBlogItem} />);
        fireEvent.click(screen.getAllByTestId('up-arrow')[0]);
        expect(updateBlogItem).toHaveBeenCalledOnce();
        const updated = updateBlogItem.mock.calls[0][0] as BlogItem;
        expect(updated.content[0]).toEqual(mediaContent);
        expect(updated.content[1]).toEqual(textContent);
    });

    it('calls updateBlogItem with new content type when select changes', () => {
        const updateBlogItem = vi.fn();
        const blogItem = makeBlogItem([defaultTextContent]);
        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={updateBlogItem} />);
        fireEvent.change(screen.getByTestId('select-input'), { target: { value: BlogContentType.media } });
        expect(updateBlogItem).toHaveBeenCalledOnce();
        const updated = updateBlogItem.mock.calls[0][0] as BlogItem;
        expect(updated.content[0].type).toBe(BlogContentType.media);
    });

    it('calls updateBlogItem with a new text item inserted above when add content above is clicked', () => {
        const updateBlogItem = vi.fn();
        const firstContent = defaultTextContent;
        const secondContent = { type: BlogContentType.media, media: 'media.mp4' } as BlogItem['content'][number];
        const blogItem = makeBlogItem([firstContent, secondContent]);

        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={updateBlogItem} />);
        fireEvent.click(screen.getAllByTestId('more-options')[0]);
        fireEvent.click(screen.getByText('Add content above'));

        expect(updateBlogItem).toHaveBeenCalledOnce();
        const updated = updateBlogItem.mock.calls[0][0] as BlogItem;
        expect(updated.content).toHaveLength(3);
        expect(updated.content[0]).toEqual(defaultTextContent);
        expect(updated.content[1]).toEqual(firstContent);
        expect(updated.content[2]).toEqual(secondContent);
    });

    it('calls updateBlogItem with a new text item inserted below when add content below is clicked', () => {
        const updateBlogItem = vi.fn();
        const firstContent = defaultTextContent;
        const secondContent = { type: BlogContentType.media, media: 'media.mp4' } as BlogItem['content'][number];
        const blogItem = makeBlogItem([firstContent, secondContent]);

        render(<BlogArticleFormComponent blogItem={blogItem} updateBlogItem={updateBlogItem} />);
        fireEvent.click(screen.getAllByTestId('more-options')[0]);
        fireEvent.click(screen.getByText('Add content below'));

        expect(updateBlogItem).toHaveBeenCalledOnce();
        const updated = updateBlogItem.mock.calls[0][0] as BlogItem;
        expect(updated.content).toHaveLength(3);
        expect(updated.content[0]).toEqual(firstContent);
        expect(updated.content[1]).toEqual(defaultTextContent);
        expect(updated.content[2]).toEqual(secondContent);
    });
});
