import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { defaultMediaContent } from '../../../../models/objects/BlogItem';
import EditMediaContentComponent from './EditMediaContentComponent';

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: vi.fn((value: string) => `http://mocked/${value}`),
        PostUpload: vi.fn(),
    },
}));

describe('EditMediaContentComponent', () => {
    it('renders edit form', () => {
        render(
            <EditMediaContentComponent
                content={defaultMediaContent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders the Media and Sub Text labels', () => {
        render(
            <EditMediaContentComponent
                content={defaultMediaContent}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByText('Media')).toBeInTheDocument();
        expect(screen.getByText('Sub Text')).toBeInTheDocument();
    });

    it('calls updateBlogContent when media input changes', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditMediaContentComponent
                content={defaultMediaContent}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'hero.png' } });

        expect(updateBlogContent).toHaveBeenCalledWith(expect.objectContaining({ media: 'hero.png' }));
    });

    it('calls updateBlogContent when sub text input changes', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditMediaContentComponent
                content={defaultMediaContent}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Image caption' } });

        expect(updateBlogContent).toHaveBeenCalledWith(expect.objectContaining({ subText: 'Image caption' }));
    });
});