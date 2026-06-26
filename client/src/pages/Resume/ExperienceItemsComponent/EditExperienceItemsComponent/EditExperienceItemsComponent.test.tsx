import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditExperienceItemsComponent from './EditExperienceItemsComponent';
import { ExperienceItem } from '../../../../models/objects/ResumeItems';

const mockExperienceItems: ExperienceItem[] = [
    { mainText: 'Company A', subText: 'Engineer', start: '2020', description: [] },
    { mainText: 'Company B', subText: 'Intern', start: '2018', description: [] },
];

const updateExperienceItems = vi.fn();

describe('EditExperienceItemsComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders an editable form item for each experience', () => {
        render(
            <EditExperienceItemsComponent
                experienceItems={mockExperienceItems}
                updateExperienceItems={updateExperienceItems}
            />
        );

        expect(screen.getAllByTestId('remove-item-button')).toHaveLength(2);
    });

    it('calls updateExperienceItems with a new default item prepended when the add button is clicked', async () => {
        render(
            <EditExperienceItemsComponent
                experienceItems={mockExperienceItems}
                updateExperienceItems={updateExperienceItems}
            />
        );

        await userEvent.click(screen.getByTestId('add-experience-item-button'));

        expect(updateExperienceItems).toHaveBeenCalledWith([
            { mainText: '', subText: '', start: '', description: [''] },
            { mainText: 'Company A', subText: 'Engineer', start: '2020', description: [] },
            { mainText: 'Company B', subText: 'Intern', start: '2018', description: [] },
        ]);
    });

    it('calls updateExperienceItems with the first item removed when its remove button is clicked', async () => {
        render(
            <EditExperienceItemsComponent
                experienceItems={mockExperienceItems}
                updateExperienceItems={updateExperienceItems}
            />
        );

        const removeButtons = screen.getAllByTestId('remove-item-button');
        await userEvent.click(removeButtons[0]);

        expect(updateExperienceItems).toHaveBeenCalledWith([
            { mainText: 'Company B', subText: 'Intern', start: '2018', description: [] },
        ]);
    });

    it('calls updateExperienceItems with the second item removed when its remove button is clicked', async () => {
        render(
            <EditExperienceItemsComponent
                experienceItems={mockExperienceItems}
                updateExperienceItems={updateExperienceItems}
            />
        );

        const removeButtons = screen.getAllByTestId('remove-item-button');
        await userEvent.click(removeButtons[1]);

        expect(updateExperienceItems).toHaveBeenCalledWith([
            { mainText: 'Company A', subText: 'Engineer', start: '2020', description: [] },
        ]);
    });

    it('renders no items when the experience list is empty', () => {
        render(
            <EditExperienceItemsComponent
                experienceItems={[]}
                updateExperienceItems={updateExperienceItems}
            />
        );

        expect(screen.queryByTestId('remove-item-button')).not.toBeInTheDocument();
    });

    it('calls updateExperienceItems with the updated item when the text input changes', () => {
        render(
            <EditExperienceItemsComponent
                experienceItems={mockExperienceItems}
                updateExperienceItems={updateExperienceItems}
            />
        );

        const mainTextInputs = screen.getAllByDisplayValue(/Company A|Company B/);
        fireEvent.change(mainTextInputs[0], { target: { value: 'Company C' } });

        expect(updateExperienceItems).toHaveBeenCalledWith([
            { mainText: 'Company C', subText: 'Engineer', start: '2020', description: [] },
            { mainText: 'Company B', subText: 'Intern', start: '2018', description: [] },
        ]);
    });
});
