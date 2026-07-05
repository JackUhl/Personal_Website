import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import Layout from './Layout';

const { mockPushEvent, mockUseScrollOffset } = vi.hoisted(() => ({
    mockPushEvent: vi.fn(),
    mockUseScrollOffset: vi.fn(() => 0),
}));
const mockScrollTo = vi.fn();

vi.mock('../../services/AnalyticsService/AnalyticsService', () => ({
    PushEvent: mockPushEvent,
}));

vi.mock('../../hooks/useScrollOffset/useScrollOffset', () => ({
    useScrollOffset: mockUseScrollOffset,
}));

function customRender() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <Layout />
        </MemoryRouter>
    );
}

describe('Layout', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        window.scrollTo = mockScrollTo;
        mockUseScrollOffset.mockReturnValue(0);
    });

    it('calls PushEvent with PageView on mount', () => {
        customRender();

        expect(mockPushEvent).toHaveBeenCalledWith('PageView');
    });

    it('hides the scroll-to-top button when at the top', () => {
        mockUseScrollOffset.mockReturnValue(0);

        customRender();

        const button = screen.getByTestId('layout-scroll-top-button');
        expect(button.className).toContain('scrollTopButtonHide');
    });

    it('shows the scroll-to-top button when scrolled down', () => {
        mockUseScrollOffset.mockReturnValue(200);

        customRender();

        const button = screen.getByTestId('layout-scroll-top-button');
        expect(button.className).not.toContain('scrollTopButtonHide');
    });

    it('scrolls to top when the scroll-to-top button is clicked', async () => {
        mockUseScrollOffset.mockReturnValue(200);

        customRender();

        const button = screen.getByTestId('layout-scroll-top-button');
        await userEvent.click(button);

        expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
