import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { defaultMervContent } from '../../../../models/objects/BlogItem';
import EditMervContentComponent from './EditMervContentComponent';

describe('EditMervContentComponent', () => {
    it('renders edit form', () => {
        render(
            <EditMervContentComponent
                content={defaultMervContent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders the Text label', () => {
        render(
            <EditMervContentComponent
                content={defaultMervContent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('calls updateBlogContent when text input changes', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditMervContentComponent
                content={defaultMervContent}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated Merv content' } });

        expect(updateBlogContent).toHaveBeenCalledWith(expect.objectContaining({ text: 'Updated Merv content' }));
    });
});