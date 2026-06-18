import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import EditTextContentComponent from './EditTextContentComponent';
import { defaultTextContent } from '../../../../models/objects/BlogItem';

describe('EditTextContentComponent', () => {
    it('renders edit form', () => {
        render(
            <EditTextContentComponent
                content={defaultTextContent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders the Content label', () => {
        render(
            <EditTextContentComponent
                content={defaultTextContent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('calls updateBlogContent when content input changes', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditTextContentComponent
                content={defaultTextContent}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated body text' } });

        expect(updateBlogContent).toHaveBeenCalledWith(expect.objectContaining({ content: 'Updated body text' }));
    });
});