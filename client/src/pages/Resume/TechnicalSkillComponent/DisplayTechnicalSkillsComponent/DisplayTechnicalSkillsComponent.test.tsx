import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TechnicalSkillItem } from '../../../../models/objects/ResumeItems';
import DisplayTechnicalSkillsComponent from './DisplayTechnicalSkillsComponent';

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: (key: string) => `https://cdn.example.com/${key}`,
    },
}));

const mockSkills: TechnicalSkillItem[] = [
    { icon: 'typescript.svg', name: 'TypeScript' },
    { icon: 'react.svg', name: 'React' },
];

describe('DisplayTechnicalSkillsComponent', () => {
    it('renders the name of each skill', () => {
        render(<DisplayTechnicalSkillsComponent technicalSkills={mockSkills} />);

        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('renders an icon for each skill using the URL from UploadService', () => {
        render(<DisplayTechnicalSkillsComponent technicalSkills={mockSkills} />);

        const icons = screen.getAllByTestId('technical-skill-icon')

        expect(icons).toHaveLength(2);
        expect(icons[0]).toHaveAttribute('src', 'https://cdn.example.com/typescript.svg');
        expect(icons[1]).toHaveAttribute('src', 'https://cdn.example.com/react.svg');
    });

    it('renders nothing when the skills list is empty', () => {
        render(<DisplayTechnicalSkillsComponent technicalSkills={[]} />);

        expect(screen.queryByTestId('technical-skill-icon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('technical-skill-name')).not.toBeInTheDocument();
    });
});
