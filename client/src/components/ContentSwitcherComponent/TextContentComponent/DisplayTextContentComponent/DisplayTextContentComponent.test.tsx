import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DisplayTextContentComponent from './DisplayTextContentComponent';

describe('DisplayTextContentComponent', () => {
    it('renders plain text content', () => {
        render(<DisplayTextContentComponent content="Hello world" />);

        expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('renders HTML content', () => {
        render(
            <DisplayTextContentComponent
                content={'<h2>Section Title</h2><p><em>Italic text</em> and <strong>Bold text</strong> with a <a href="https://example.com">Reference Link</a>.</p>'}
            />
        );

        expect(screen.getByRole('heading', { name: 'Section Title' })).toBeInTheDocument();
        expect(screen.getByText('Italic text').tagName).toBe('EM');
        expect(screen.getByText('Bold text').tagName).toBe('STRONG');
        expect(screen.getByRole('link', { name: 'Reference Link' })).toHaveAttribute('href', 'https://example.com');
    });

    it('renders an empty container when content is empty', () => {
        const { container } = render(<DisplayTextContentComponent content="" />);

        expect(container.firstChild).toBeInTheDocument();
        expect(container.firstChild).toBeEmptyDOMElement();
    });
});