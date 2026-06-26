import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditTechnicalSkillsComponent from './EditTechnicalSkillsComponent';
import { TechnicalSkillItem } from '../../../../models/objects/ResumeItems';

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: (key: string) => `https://cdn.example.com/${key}`,
    },
}));

const mockSkills: TechnicalSkillItem[] = [
    { icon: 'ts.svg', name: 'TypeScript' },
    { icon: 'react.svg', name: 'React' },
];

const updateTechnicalSkills = vi.fn()

describe('EditTechnicalSkillsComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders an editable form item for each skill', () => {
        render(
            <EditTechnicalSkillsComponent
                technicalSkills={mockSkills}
                updateTechnicalSkills={updateTechnicalSkills}
            />
        );

        expect(screen.getAllByTestId('remove-item-button')).toHaveLength(2);
    });

    it('calls updateTechnicalSkills with a new default skill appended when the add button is clicked', async () => {
        render(
            <EditTechnicalSkillsComponent
                technicalSkills={mockSkills}
                updateTechnicalSkills={updateTechnicalSkills}
            />
        );

        await userEvent.click(screen.getByTestId('add-technical-skill-button'));

        expect(updateTechnicalSkills).toHaveBeenCalledWith([
            { icon: 'ts.svg', name: 'TypeScript' },
            { icon: 'react.svg', name: 'React' },
            { icon: '', name: '' },
        ]);
    });

    it('calls updateTechnicalSkills with the first skill removed when its remove button is clicked', async () => {
        render(
            <EditTechnicalSkillsComponent
                technicalSkills={mockSkills}
                updateTechnicalSkills={updateTechnicalSkills}
            />
        );

        const removeButtons = screen.getAllByTestId('remove-item-button');
        await userEvent.click(removeButtons[0]);

        expect(updateTechnicalSkills).toHaveBeenCalledWith([
            { icon: 'react.svg', name: 'React' },
        ]);
    });

    it('calls updateTechnicalSkills with the second skill removed when its remove button is clicked', async () => {
        render(
            <EditTechnicalSkillsComponent
                technicalSkills={mockSkills}
                updateTechnicalSkills={updateTechnicalSkills}
            />
        );

        const removeButtons = screen.getAllByTestId('remove-item-button');
        await userEvent.click(removeButtons[1]);

        expect(updateTechnicalSkills).toHaveBeenCalledWith([
            { icon: 'ts.svg', name: 'TypeScript' },
        ]);
    });

    it('renders no items when the skills list is empty', () => {
        render(
            <EditTechnicalSkillsComponent
                technicalSkills={[]}
                updateTechnicalSkills={updateTechnicalSkills}
            />
        );

        expect(screen.queryByTestId('remove-item-button')).not.toBeInTheDocument();
    });

    it('calls updateTechnicalSkills with the updated skill when the name input changes', () => {
        render(
            <EditTechnicalSkillsComponent
                technicalSkills={mockSkills}
                updateTechnicalSkills={updateTechnicalSkills}
            />
        );

        const nameInputs = screen.getAllByDisplayValue(/TypeScript|React/);
        fireEvent.change(nameInputs[0], { target: { value: 'JavaScript' } });

        expect(updateTechnicalSkills).toHaveBeenCalledWith([
            { icon: 'ts.svg', name: 'JavaScript' },
            { icon: 'react.svg', name: 'React' },
        ]);
    });
});

