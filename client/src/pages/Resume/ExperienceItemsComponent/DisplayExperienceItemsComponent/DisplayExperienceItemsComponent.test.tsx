import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExperienceItem } from '../../../../models/objects/ResumeItems';
import DisplayExperienceItemsComponent from './DisplayExperienceItemsComponent';

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
    it('renders an experience item for each supplied item', () => {
        render(<DisplayExperienceItemsComponent experienceItems={mockExperienceItems} />);

        expect(screen.getByText('Company A,')).toBeInTheDocument();
        expect(screen.getByText('Company B,')).toBeInTheDocument();
    });

    it('renders nothing when the experience list is empty', () => {
        render(<DisplayExperienceItemsComponent experienceItems={[]} />);

        expect(screen.queryByTestId("experience-item-expandable")).not.toBeInTheDocument();
    });
});
