import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import EditResourcesContentComponent from './EditResourcesContentComponent';
import {
    defaultResourcesContent,
    ResourcesContent,
} from '../../../../models/objects/BlogItem';

const makeResourcesContent = (): ResourcesContent => ({
    ...defaultResourcesContent,
    resources: defaultResourcesContent.resources.map((resource) => ({ ...resource })),
});

describe('EditResourcesContentComponent', () => {
    it('renders edit form', () => {
        render(
            <EditResourcesContentComponent
                content={makeResourcesContent()}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });

    it('renders the Resource and Link labels', () => {
        render(
            <EditResourcesContentComponent
                content={makeResourcesContent()}
                updateBlogContent={vi.fn()}
            />
        );

        expect(screen.getByText('Resource')).toBeInTheDocument();
        expect(screen.getByText('Link')).toBeInTheDocument();
    });

    it('calls updateBlogContent when resource input changes', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditResourcesContentComponent
                content={makeResourcesContent()}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'GitHub' } });

        expect(updateBlogContent).toHaveBeenCalledWith(
            expect.objectContaining({
                resources: [expect.objectContaining({ resource: 'GitHub' })],
            })
        );
    });

    it('calls updateBlogContent with an additional resource when add is clicked', () => {
        const updateBlogContent = vi.fn();

        render(
            <EditResourcesContentComponent
                content={makeResourcesContent()}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.click(screen.getByTestId('add-link-button'));

        expect(updateBlogContent).toHaveBeenCalledOnce();
        expect(updateBlogContent).toHaveBeenCalledWith(
            expect.objectContaining({
                resources: [
                    expect.objectContaining({ resource: '', link: '' }),
                    expect.objectContaining({ resource: '', link: '' }),
                ],
            })
        );
    });

    it('calls updateBlogContent with one less resource when remove is clicked', () => {
        const updateBlogContent = vi.fn();
        const contentWithTwoResources: ResourcesContent = {
            ...makeResourcesContent(),
            resources: [
                { resource: 'First', link: 'https://first.dev' },
                { resource: 'Second', link: 'https://second.dev' },
            ],
        };

        render(
            <EditResourcesContentComponent
                content={contentWithTwoResources}
                updateBlogContent={updateBlogContent}
            />
        );

        fireEvent.click(screen.getAllByTestId('remove-item-button')[0]);

        expect(updateBlogContent).toHaveBeenCalledOnce();
        expect(updateBlogContent).toHaveBeenCalledWith(
            expect.objectContaining({
                resources: [expect.objectContaining({ resource: 'Second', link: 'https://second.dev' })],
            })
        );
    });
});