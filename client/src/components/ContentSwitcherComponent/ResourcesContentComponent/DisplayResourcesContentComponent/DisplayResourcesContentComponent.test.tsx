import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DisplayResourcesContentComponent from './DisplayResourcesContentComponent';

describe('DisplayResourcesContentComponent', () => {
    it('renders Resources title', () => {
        render(<DisplayResourcesContentComponent resources={[]} />);

        expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('renders provided resource links with target blank', () => {
        render(
            <DisplayResourcesContentComponent
                resources={[
                    { resource: 'GitHub', link: 'https://github.com' },
                    { resource: 'Docs', link: 'https://example.com/docs' },
                ]}
            />
        );

        const githubLink = screen.getByRole('link', { name: 'GitHub' });
        const docsLink = screen.getByRole('link', { name: 'Docs' });

        expect(githubLink).toHaveAttribute('href', 'https://github.com');
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(docsLink).toHaveAttribute('href', 'https://example.com/docs');
        expect(docsLink).toHaveAttribute('target', '_blank');
    });

    it('does not render links when resources list is empty', () => {
        render(<DisplayResourcesContentComponent resources={[]} />);

        expect(screen.queryAllByRole('link')).toHaveLength(0);
    });
});