import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { LoadingState } from '../../models/enums/LoadingState';
import { ResumeItems } from '../../models/objects/ResumeItems';
import Resume from './Resume';

const { mockUseFetch, mockUseIsMobile, mockPutResume } = vi.hoisted(() => ({
    mockUseFetch: vi.fn(),
    mockUseIsMobile: vi.fn(() => false),
    mockPutResume: vi.fn(),
}));

vi.mock('../../hooks/useFetch/useFetch', () => ({ useFetch: mockUseFetch }));

vi.mock('../../hooks/useIsMobile/useIsMobile', () => ({ useIsMobile: mockUseIsMobile }));

vi.mock('../../hooks/useHeatbeat/useHeartbeat', () => ({ useHeartbeat: vi.fn() }));

vi.mock('../../services/ResumeService/ResumeService', () => ({
    ResumeService: {
        GetResume: vi.fn(),
        PutResume: mockPutResume,
    },
}));

const mockResumeItems: ResumeItems = {
    workExperiences: [{ mainText: 'Company', subText: 'Role', start: '2020', description: [] }],
    educationExperiences: [{ mainText: 'University', subText: 'Degree', start: '2016', description: [] }],
    technicalSkills: [{ icon: 'ts.svg', name: 'TypeScript' }],
    resumeDocument: { data: 'resume.pdf' },
};

function customRender(isAdmin = false) {
    return render(
        <MemoryRouter>
            <AuthenticationContext.Provider value={isAdmin}>
                <Resume />
            </AuthenticationContext.Provider>
        </MemoryRouter>
    );
}

describe('Resume', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseIsMobile.mockReturnValue(false);
    });

    describe('loading state', () => {
        it('renders the Loading component when fetching', () => {
            mockUseFetch.mockReturnValue({ response: undefined, loadingState: LoadingState.loading });

            customRender();

            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });

        it('renders the Failed component when the fetch fails', () => {
            mockUseFetch.mockReturnValue({ response: undefined, loadingState: LoadingState.failed });

            customRender();

            expect(screen.getByTestId('error')).toBeInTheDocument();
        });
    });

    describe('admin mode', () => {
        beforeEach(() => {
            mockUseFetch.mockReturnValue({ response: mockResumeItems, loadingState: LoadingState.success });
        });

        it('does not show the edit button for non-admin users', () => {
            customRender(false);

            expect(screen.queryByText('Edit Resume')).not.toBeInTheDocument();
        });

        it('shows the edit button for admin users', () => {
            customRender(true);

            expect(screen.getByText('Edit Resume')).toBeInTheDocument();
        });

        it('shows Cancel and Save buttons in edit mode', async () => {
            customRender(true);

            await userEvent.click(screen.getByText('Edit Resume'));

            expect(screen.getByText('Cancel')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
        });

        it('exits edit mode and restores display components when Cancel is clicked', async () => {
            customRender(true);

            await userEvent.click(screen.getByText('Edit Resume'));
            await userEvent.click(screen.getByText('Cancel'));

            expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        });

        it('calls PutResume and exits edit mode on successful save', async () => {
            mockPutResume.mockResolvedValueOnce({ data: mockResumeItems });
            customRender(true);

            await userEvent.click(screen.getByText('Edit Resume'));
            await userEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(mockPutResume).toHaveBeenCalledOnce();
                expect(screen.queryByText('Save')).not.toBeInTheDocument();
            });
        });

        it('shows an error message when PutResume fails', async () => {
            mockPutResume.mockRejectedValueOnce(new Error('server error'));
            customRender(true);

            await userEvent.click(screen.getByText('Edit Resume'));
            await userEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(screen.getByText('Error editing resume')).toBeInTheDocument();
            });
        });
    });
});
