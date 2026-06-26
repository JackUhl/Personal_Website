import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import DisplayMervContentComponent from './DisplayMervContentComponent';
import { desktopMervContentContainer, mobileMervContentContainer } from './DisplayMervContentComponent.module.css';

const { mockUseIsMobile } = vi.hoisted(() => ({
    mockUseIsMobile: vi.fn(() => false),
}));

vi.mock('../../../../hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: mockUseIsMobile,
}));

describe('DisplayMervContentComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseIsMobile.mockReturnValue(false);
    });

    it('passes text and MERV path to TerminalComponent', () => {
        const { container } = render(<DisplayMervContentComponent text="echo hello" />);

        const terminalText = container.textContent;

        expect(terminalText).toContain('echo hello');
        expect(terminalText).toContain('C:\\MERV>');
    });

    it('uses desktop container class when not mobile', () => {
        const { container } = render(<DisplayMervContentComponent text="desktop text" />);

        expect(container.firstChild).toHaveClass(desktopMervContentContainer);
        expect(container.firstChild).not.toHaveClass(mobileMervContentContainer);
    });

    it('uses mobile container class when mobile', () => {
        mockUseIsMobile.mockReturnValue(true);

        const { container } = render(<DisplayMervContentComponent text="mobile text" />);

        expect(container.firstChild).toHaveClass(mobileMervContentContainer);
        expect(container.firstChild).not.toHaveClass(desktopMervContentContainer);
    });
});