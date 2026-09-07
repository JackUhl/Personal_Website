import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ExperienceItem } from '../../../../../models/objects/ResumeItems';
import ExperienceItemComponent from './ExperienceItemComponent';

const mockRevealComponent = vi.fn();

vi.mock('../../../../../components/RevealComponent/RevealComponent', () => ({
    default: (props: { children: React.ReactNode; noReveal?: boolean }) => {
        mockRevealComponent(props);
        return <>{props.children}</>;
    },
}));

const mockExperienceItem: ExperienceItem = {
    mainText: 'Company A',
    subText: 'Engineer',
    start: '2020-01-01',
    end: '2022-06-01',
    position: 'Full-time',
    description: ['Built things', 'Fixed bugs'],
};

const mockExperienceItemWithoutDescription: ExperienceItem = {
    mainText: 'Company B',
    subText: 'Intern',
    start: '2018-05-01',
    description: [],
};

describe('ExperienceItemComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the item text, position, and dates', () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        expect(screen.getByText('Company A,')).toBeInTheDocument();
        expect(screen.getByText('Engineer')).toBeInTheDocument();
        expect(screen.getByText('Full-time')).toBeInTheDocument();
    });

    it('renders "Present" when there is no end date', () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItemWithoutDescription} isLastItem={false} />);

        expect(screen.getByText(/Present/)).toBeInTheDocument();
    });

    it('renders description items when expanded', () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        expect(screen.getByText('Built things')).toBeInTheDocument();
        expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    });

    it('hides description items when the title is clicked', async () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        await userEvent.click(screen.getByTestId('experience-item-expandable'));

        expect(screen.queryByText('Built things')).not.toBeInTheDocument();
        expect(screen.queryByText('Fixed bugs')).not.toBeInTheDocument();
    });

    it('re-shows description items when the title is clicked again', async () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        const expandable = screen.getByTestId('experience-item-expandable');
        await userEvent.click(expandable);
        await userEvent.click(expandable);

        expect(screen.getByText('Built things')).toBeInTheDocument();
        expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    });

    it('renders the arrow icon only when description items exist', () => {
        const { rerender } = render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        expect(within(screen.getByTestId('experience-item-expandable')).getByRole('img')).toBeInTheDocument();

        rerender(<ExperienceItemComponent experienceItem={mockExperienceItemWithoutDescription} isLastItem={false} />);

        expect(within(screen.getByTestId('experience-item-expandable')).queryByRole('img')).not.toBeInTheDocument();
    });

    it('passes noReveal=true to RevealComponent on first render', () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        expect(mockRevealComponent).toHaveBeenCalledWith(
            expect.objectContaining({ noReveal: true })
        );
    });

    it('passes noReveal=false to RevealComponent after interaction', async () => {
        render(<ExperienceItemComponent experienceItem={mockExperienceItem} isLastItem={false} />);

        const expandable = screen.getByTestId('experience-item-expandable');
        await userEvent.click(expandable);
        await userEvent.click(expandable);

        expect(mockRevealComponent).toHaveBeenCalledWith(
            expect.objectContaining({ noReveal: false })
        );
    });
});