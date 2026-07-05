import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
    BlogContent,
    defaultMediaContent,
    defaultMervContent,
    defaultResourcesContent,
    defaultTextContent,
} from '../../models/objects/BlogItem';
import ContentSwitcherComponent from './ContentSwitcherComponent';

const customRender = (content: BlogContent, editMode: boolean) => render(
    <ContentSwitcherComponent
        blogContent={content}
        editMode={editMode}
        updateBlogContent={vi.fn()}
    />
);

describe('ContentSwitcherComponent', () => {
    it('renders edit-form when edit mode is enabled for text content', () => {
        customRender(defaultTextContent, true);
        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders edit-form when edit mode is enabled for media content', () => {
        customRender(defaultMediaContent, true);
        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders edit-form when edit mode is enabled for merv content', () => {
        customRender(defaultMervContent, true);
        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders edit-form when edit mode is enabled for resources content', () => {
        customRender(defaultResourcesContent, true);
        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('does not render edit-form when display mode is enabled for text content', () => {
        customRender(defaultTextContent, false);
        expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });

    it('does not render edit-form when display mode is enabled for media content', () => {
        customRender(defaultMediaContent, false);
        expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });

    it('does not render edit-form when display mode is enabled for merv content', () => {
        customRender(defaultMervContent, false);
        expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });

    it('does not render edit-form when display mode is enabled for resources content', () => {
        customRender(defaultResourcesContent, false);
        expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });

    it('renders error when content type is not recognized at runtime', () => {
        const invalidContent = {
            ...defaultTextContent,
            type: 'abc',
        } as unknown as BlogContent;

        customRender(invalidContent, true);

        expect(screen.getByText('Unrecognized content type.')).toBeInTheDocument();
    });
});