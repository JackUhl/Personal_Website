import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import EditTitleComponentComponent from './EditTitleContentComponent';
import { deafultTitleContentComponent } from '../../../../models/objects/BlogItem';

describe('EditTitleContentComponent', () => {
    it('renders edit form', () => {
        render(
            <EditTitleComponentComponent
                content={deafultTitleContentComponent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders the Title label', () => {
        render(
            <EditTitleComponentComponent
                content={deafultTitleContentComponent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('calls updateBlogContent when title input changes', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditTitleComponentComponent
                content={deafultTitleContentComponent}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated title' } });

        expect(updateBlogContent).toHaveBeenCalledWith(expect.objectContaining({ title: 'Updated title' }));
    });
});
