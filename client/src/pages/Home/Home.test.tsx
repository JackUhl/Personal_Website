import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { emailAddress,githubUrl, linkedInUrl } from '../../models/constants/ExternalUrlConstants';
import Home from './Home';

const { mockUseIsMobile } = vi.hoisted(() => ({
    mockUseIsMobile: vi.fn(() => false),
}));

vi.mock('../../hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: mockUseIsMobile,
}));

vi.mock('../../components/RevealComponent/RevealComponent', () => ({
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../components/TerminalComponent/TerminalComponent', () => ({
    default: () => <div data-testid="terminal" />,
}));

vi.mock('../../components/HrefButtonComponent/HrefButtonComponent', () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a href={href}>{children}</a>
    ),
}));

function customRender() {
    return render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
}

describe('Home', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseIsMobile.mockReturnValue(false);
    });

    it('renders the contact me button linking to the email address', () => {
        customRender();

        const contactLink = screen.getByRole('link', { name: /contact me/i });
        expect(contactLink).toHaveAttribute('href', `mailto:${emailAddress}`);
    });

    it('renders the LinkedIn link', () => {
        customRender();

        const linkedInLink = screen.getByTestId('home-linkedin-button');
        expect(linkedInLink).toHaveAttribute('href', linkedInUrl);
    });

    it('renders the GitHub link', () => {
        customRender();

        const githubLink = screen.getByTestId('home-github-button');
        expect(githubLink).toHaveAttribute('href', githubUrl);
    });
});
