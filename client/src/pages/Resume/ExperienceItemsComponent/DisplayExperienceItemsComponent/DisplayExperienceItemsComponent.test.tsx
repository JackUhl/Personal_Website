import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayExperienceItemsComponent from './DisplayExperienceItemsComponent';
import { ExperienceItem } from '../../../../models/objects/ResumeItems';

const mockRevealComponent = vi.fn();

vi.mock('../../../../components/RevealComponent/RevealComponent', () => ({
    default: (props: { children: React.ReactNode; noReveal?: boolean }) => {
        mockRevealComponent(props);
        return <>{props.children}</>;
    },
}));

const mockExperienceItems: ExperienceItem[] = [
    {
        mainText: 'Company A',
        subText: 'Engineer',
        start: '2020-01-01',
        end: '2022-06-01',
        position: 'Full-time',
        description: ['Built things', 'Fixed bugs'],
    },
    {
        mainText: 'Company B',
        subText: 'Intern',
        start: '2018-05-01',
        description: [],
    },
];

describe('DisplayExperienceItemsComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the main text and sub text for each item', () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        expect(screen.getByText('Company A,')).toBeInTheDocument();
        expect(screen.getByText('Engineer')).toBeInTheDocument();
        expect(screen.getByText('Company B,')).toBeInTheDocument();
        expect(screen.getByText('Intern')).toBeInTheDocument();
    });

    it('renders the position when provided', () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        expect(screen.getByText('Full-time')).toBeInTheDocument();
    });

    it('renders "Present" for items with no end date', () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        expect(screen.getByText(/Present/)).toBeInTheDocument();
    });

    it('renders description items when expanded', () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        expect(screen.getByText('Built things')).toBeInTheDocument();
        expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    });

    it('hides description items when the title is clicked', async () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        const expandables = screen.getAllByTestId('experience-item-expandable');
        await userEvent.click(expandables[0]);

        expect(screen.queryByText('Built things')).not.toBeInTheDocument();
        expect(screen.queryByText('Fixed bugs')).not.toBeInTheDocument();
    });

    it('re-shows description items when the title is clicked again', async () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        const expandables = screen.getAllByTestId('experience-item-expandable');
        await userEvent.click(expandables[0]);
        await userEvent.click(expandables[0]);

        expect(screen.getByText('Built things')).toBeInTheDocument();
        expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    });

    it('renders nothing when the experience list is empty', () => {
        render(<DisplayExperienceItemsComponent experienceItems={[]} />);

        expect(screen.queryByTestId("experience-item-expandable")).not.toBeInTheDocument();
    });

    it('passes noReveal=true to RevealComponent on first render', () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        expect(mockRevealComponent).toHaveBeenCalledWith(
            expect.objectContaining({ noReveal: true })
        );
    });

    it('passes noReveal=false to RevealComponent after the first interaction', async () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        // Show reveal animation after collapsing and then re-expanding
        const expandables = screen.getAllByTestId('experience-item-expandable');
        await userEvent.click(expandables[0]);
        await userEvent.click(expandables[0]);

        expect(mockRevealComponent).toHaveBeenCalledWith(
            expect.objectContaining({ noReveal: false })
        );
    });
});
