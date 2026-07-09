import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import DisplayMediaContentComponent from './DisplayMediaContentComponent';

const { mockUseIsMobile } = vi.hoisted(() => ({
    mockUseIsMobile: vi.fn(() => false),
}));

vi.mock('../../../../hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: mockUseIsMobile,
}));

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: (key: string) => `http://mocked/${key}`,
    },
}));

describe('DisplayMediaContentComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseIsMobile.mockReturnValue(false);
    });

    it('renders the media viewer with the uploaded image URL', () => {
        const { container } = render(<DisplayMediaContentComponent media="hero.png" />);

        expect(screen.getByText('Media Viewer')).toBeInTheDocument();
        expect(container.querySelector('img[src="http://mocked/hero.png"]')).toBeInTheDocument();
    });

    it('renders sub text when provided', () => {
        render(<DisplayMediaContentComponent media="hero.png" subText="Image caption" />);

        expect(screen.getByTestId('media-content-subtext')).toHaveTextContent('Image caption');
    });

    it('does not render sub text when not provided', () => {
        render(<DisplayMediaContentComponent media="hero.png" />);

        expect(screen.queryByTestId('media-content-subtext')).not.toBeInTheDocument();
    });

    it('uses desktop width when not mobile', () => {
        const { container } = render(<DisplayMediaContentComponent media="hero.png" />);

        expect(container.firstChild).toHaveStyle({ width: '75%' });
    });

    it('uses mobile width when mobile', () => {
        mockUseIsMobile.mockReturnValue(true);

        const { container } = render(<DisplayMediaContentComponent media="hero.png" />);

        expect(container.firstChild).toHaveStyle({ width: '100%' });
    });
});