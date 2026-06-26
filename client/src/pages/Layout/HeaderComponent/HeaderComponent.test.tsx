import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { HomeRoute } from '../../../models/constants/RouteConstants';

const { mockUseIsMobile } = vi.hoisted(() => ({
    mockUseIsMobile: vi.fn(() => false),
}));

vi.mock('../../../hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: mockUseIsMobile,
}));

function customRender(isAdmin = false, initialPath = '/') {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <AuthenticationContext.Provider value={isAdmin}>
                <HeaderComponent />
            </AuthenticationContext.Provider>
        </MemoryRouter>
    );
}

describe('HeaderComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseIsMobile.mockReturnValue(false);
        window.scrollTo = vi.fn();
    });

    describe('home link', () => {
        it('navigates to the home route when the header title is clicked', async () => {
            customRender(false, '/resume');

            await userEvent.click(screen.getByTestId('header-title-link'));

            expect(screen.getByTestId('header-title-link')).toHaveAttribute('href', HomeRoute);
        });
    });

    describe('admin', () => {
        it('does not show the admin indicator when not admin', () => {
            customRender(false);

            expect(screen.queryByText(/Admin Mode/)).not.toBeInTheDocument();
        });

        it('shows the admin indicator when authenticated as admin', () => {
            customRender(true);

            expect(screen.getByText(/Admin Mode/)).toBeInTheDocument();
        });
    });

    describe('desktop navigation', () => {
        it('does not show the hamburger menu on desktop', () => {
            customRender();

            expect(screen.queryByTestId('header-hamburger-menu')).not.toBeInTheDocument();
        });

        it('scrolls to top when a nav item is clicked', async () => {
            customRender();

            await userEvent.click(screen.getAllByTestId('header-nav-item-home')[0]);

            expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
        });
    });

    describe('mobile navigation', () => {
        beforeEach(() => {
            mockUseIsMobile.mockReturnValue(true);
        });

        it('renders the hamburger menu icon on mobile', () => {
            customRender();

            expect(screen.getByTestId('header-hamburger-menu')).toBeInTheDocument();
        });

        it('expands the mobile menu when the hamburger icon is clicked', async () => {
            customRender();

            await userEvent.click(screen.getByTestId('header-hamburger-menu'));

            expect(document.body.style.overflow).toBe('hidden');
        });

        it('collapses the mobile menu when the hamburger icon is clicked again', async () => {
            customRender();

            //Click once to open and twice to close
            await userEvent.click(screen.getByTestId('header-hamburger-menu'));
            await userEvent.click(screen.getByTestId('header-hamburger-menu'));

            expect(document.body.style.overflow).toBe('auto');
        });

        it('collapses the mobile menu when a nav item is clicked', async () => {
            customRender();

            await userEvent.click(screen.getByTestId('header-hamburger-menu'));
            await userEvent.click(screen.getAllByTestId('header-nav-item-home')[0]);

            expect(document.body.style.overflow).toBe('auto');
        });
    });

    describe('active route highlighting', () => {
        it('applies the selected class to the current route nav item', () => {
            customRender(false, '/resume');

            const resumeLinks = screen.getAllByTestId('header-nav-item-resume');
            expect(resumeLinks[0].className).toContain('navigationItemSelected');
        });

        it('does not apply the selected class to non-current route nav items', () => {
            customRender(false, '/resume');

            const homeLinks = screen.getAllByTestId('header-nav-item-home');
            expect(homeLinks[0].className).not.toContain('navigationItemSelected');
        });
    });
});
